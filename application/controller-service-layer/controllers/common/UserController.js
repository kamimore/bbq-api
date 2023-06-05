const helpers = requireDirectory(module, '../../../../helpers');
const csv = require('csvtojson');

module.exports = (function () {
    const checkUniqueUser = async (req, res, callback) => {
        try {
            if (req.body.email) {
                const user = await domain.User.findOne({
                    where: {
                        email: req.body.email,
                    },
                });

                if (user) throw new Error('Email already registered!');
            }

            const user = await domain.User.findOne({
                where: {
                    phone: req.body.phone,
                },
            });

            if (user) throw new Error('Phone already registered!');

            return callback(null, user);
        } catch (err) {
            return callback(err);
        }
    };

    const changePassword = function (req, res, callback) {
        this.services.userService.changePassword(req, res, callback);
    };

    const createPassword = function (req, res, callback) {
        this.services.userService.createPassword(req, res, callback);
    };

    const changeEmail = function (req, res, callback) {
        this.services.userService.changeEmail(req, res, callback);
    };

    const getUserList = function (req, res, callback) {
        const { surveyId } = req.params;

        if (!surveyId) return callback('survey id not found');

        this.services.userService.getUserList(req.loggedInUser.id, surveyId, callback);
    };

    const csvToJson = async function (req, res, callback) {
        const jsonData = await csv().fromFile(req.files.file.path);
        return callback(null, jsonData);
    };

    const verifyPasswordAndSendOTP = async function (req, res, callback) {
        this.services.userService.verifyPasswordAndSendOTP(req, callback);
    };

    const updatePhone = async function (req, res, callback) {
        this.services.userService.updatePhone(req, callback);
    };

    const uploadImage = async function (req, res, callback) {
        this.services.userService.uploadImage(req, callback);
    };

    return {
        checkUniqueUser,
        changePassword,
        changeEmail,
        getUserList,
        csvToJson,
        createPassword,
        verifyPasswordAndSendOTP,
        updatePhone,
        uploadImage,
    };
}());
