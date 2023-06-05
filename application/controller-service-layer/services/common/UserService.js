const uuid = require('node-uuid');
const AWS = require('aws-sdk');
const tokenService = require('./TokenService');
const authService = require('./AuthenticationService');
const OTPService = require('./SmsService');
const {
    random,
    find,
} = require('lodash');

const bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});


module.exports = (function () {
    const create = async (data, role = 'user') => {
        role = role.toLowerCase();
        const salt = uuid.v1();
        let password = '';

        if (data && data.password) {
            password = configHolder.encrypt(salt, data.password);
        } else {
            let randomPassword = random(10000, 9999999);
            randomPassword = randomPassword.toString();
            password = configHolder.encrypt(salt, randomPassword);
            // data.tempPassword = randomPassword;
        }

        if (role === 'vendor') {
            Object.assign(data, {
                salt,
                password,
                roleId: null,
                userName: data.email,
                userType: 'vendor',
            });
        } else {
            const roleObj = await domain.Role.findOne({
                where: {
                    name: role,
                },
            });

            if (!roleObj) throw new Error('Role not found in db');

            Object.assign(data, {
                salt,
                password,
                roleId: roleObj.id,
                userName: data.email,
            });
        }

        return domain.User.create(data);
    };

    const changePassword = async (req, res, callback) => {
        try {
            const {
                oldPassword,
                newPassword,
            } = req.body;

            const user = req.loggedInUser;

            if (!user.isValidPassword(oldPassword)) throw new Error('Old password does not match!');

            const success = await domain.User.updatePassword(user.id, newPassword);

            if (!success) throw new Error(configHolder.messages.error.internalServerError);

            return callback(null, {
                message: 'Password successfully changed.',
            });
        } catch (err) {
            return callback(err);
        }
    };

    const createPassword = async (req, res, callback) => {
        try {
            const {
                password,
                phone,
                token,
            } = req.body;

            const tokenObj = await tokenService.get(token);

            if (!tokenObj) throw new Error('Invalid token.');

            const createdUser = await domain.User.findOne({
                where: {
                    phone,
                },
            });
            const userId = createdUser.id;

            const success = await domain.User.updatePassword(createdUser.id, password);

            if (!success) throw new Error(configHolder.messages.error.internalServerError);

            await tokenService.deleteToken(token);
            let data;
            await authService.login(phone, password, {}, {}, (error, response) => {
                if (error) throw new Error(error);
                data = response;
                data.firstTimeUser = true;
            });

            return callback(null, data);
        } catch (err) {
            return callback(err);
        }
    };

    const changeEmail = async (req, res, callback) => {
        try {
            const {
                newEmail,
                password,
            } = req.body;

            const user = req.loggedInUser;

            if (!user.isValidPassword(password)) throw new Error('Updation failed.Wrong password.');

            // check email already exists or not
            const isEmailExists = await domain.User.findByEmail(newEmail);

            if (isEmailExists) throw new Error(configHolder.messages.error.email_not_unique);

            const success = await user.update({
                email: newEmail,
            });

            if (!success) throw new Error(configHolder.messages.error.internalServerError);

            return callback(null, {
                message: 'Email successfully changed.',
            });
        } catch (err) {
            return callback(err);
        }
    };

    const getUserList = async (userId, siteSurveyId, callback) => {
        try {
            const query = {
                attributes: ['id', 'fullName'],
                where: {
                    id: {
                        $not: userId,
                    },
                },
                include: [{
                    model: domain.Role,
                    where: {
                        name: {
                            $in: ['legal', 'operations', 'project'],
                        },
                    },
                    attributes: ['id', 'name'],
                }],
            };

            const users = await domain.User.findAll(query);

            const assignedUsers = await domain.SiteSurveyApproval.findAll({
                where: {
                    siteSurveyId,
                },
                attributes: ['assignedToId', 'status', 'dueDate'],
            });

            console.log('assignedUsers', assignedUsers);
            const submitedUserIds = assignedUsers.filter(s => s.status !== 'pending').map(s => s.assignedToId);

            const assignedUserIds = (assignedUsers && assignedUsers.length) ? assignedUsers.map(s => s.assignedToId) : [];

            console.log('assignedUserIds', assignedUserIds);

            const userList = users.filter(u => !submitedUserIds.includes(u.id)).map((u) => {
                u.dataValues.dueDate = null;
                u.dataValues.isAssigned = assignedUserIds.includes(u.id);
                const assigned = assignedUsers.find(a => a.assignedToId === u.id);
                if (assigned) u.dataValues.dueDate = assigned.dueDate;
                return u;
            });

            return callback(null, userList);
        } catch (err) {
            return callback(err);
        }
    };

    const verifyPasswordAndSendOTP = async (data, callback) => {
        try {
            const {
                password,
                phone,
            } = data.body;

            const user = data.loggedInUser;

            const isUserExist = await domain.User.findOne({
                where: {
                    phone,
                },
            });

            if (isUserExist) throw new Error('Phone number is already registered');

            if (!user.isValidPassword(password)) throw new Error('Password does not match!');

            OTPService.send({
                phone,
            }, callback);
        } catch (error) {
            return callback(error);
        }
    };

    const updatePhone = async (data, callback) => {
        try {
            const {
                phone,
                otp,
            } = data.body;
            const user = data.loggedInUser;

            const isOtp = await domain.Otp.findOne({
                where: {
                    phone,
                    otp,
                },
            });

            if (!isOtp) throw new Error('Otp is incorrect.');

            await domain.Otp.destroy({
                where: {
                    phone,
                    otp,
                },
            });

            const vendor = await domain.Vendor.findOne({
                where: {
                    userId: user.id,
                },
            });

            let vendorLocation;

            if (vendor) {
                vendorLocation = await domain.VendorLocation.findOne({
                    where: {
                        vendorId: vendor.id,
                    },
                });
            }

            // if (!vendorLocation) throw new Error('Vendor location not found!');

            await Promise.all([
                domain.User.update({
                    phone,
                }, {
                    where: {
                        id: user.id,
                    },
                }),
                domain.VendorLocation.update({
                    phoneNumber: phone,
                }, {
                    where: {
                        id: vendorLocation.id,
                    },
                }),
            ]);

            return callback(null, { message: 'Phone successfully updated.' });
        } catch (error) {
            return callback(error);
        }
    };

    const uploadImage = async (data, callback) => {
        try {
            const { file } = data;
            if (!file) {
                return callback('File not saved');
            }

            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `${Date.now()}-${file.originalname.split(' ').join('-')}`,
                Body: file.buffer,
                ACL: 'public-read',
            };

            bucket.upload(params, (err, data) => {
                if (err) {
                    return callback(err);
                }
                    return callback(null, { message: 'file uploaded', data });
            });
        } catch (err) {
            callback(err);
        }
    };

    return {
        create,
        changePassword,
        changeEmail,
        getUserList,
        createPassword,
        verifyPasswordAndSendOTP,
        updatePhone,
        uploadImage,
    };
}());
