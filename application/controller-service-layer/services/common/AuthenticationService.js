const tokenService = require('./TokenService');
const jwtService = require('./JWTService');

module.exports = (function () {
    async function createJWTTokenAndSendResponse(user, callback) {
        try {
            if (!user) throw new Error('Invalid Token.Please try again.');

            if (user.isAccountLocked) {
                throw new Error(
                    'Your account is locked.Please contact to site admin.',
                );
            }

            if (!user.isEmailVerified) {
                throw new Error(
                    'Your account is inactive.Please verify your email.',
                );
            }

            const token = jwtService.create({
                userId: user.id,
            });

            let role = null;
            let permissions = null;

            if (user.userType === 'employee') {
                role = user.role ? user.role.name : '';
                permissions = user.role ? user.role.permission : [];
            }

            user.dataValues.role = role;
            user.dataValues.permission = permissions;

            delete user.password;
            delete user.salt;

            if (user && user.dataValues) {
                delete user.dataValues.password;
                delete user.dataValues.salt;
            }

            return callback(null, {
                token,
                user,
            });
        } catch (err) {
            return callback(err);
        }
    }

    const login = async (userName, password, data, res, callback) => {
        try {
                const user = await domain.User.findOne({
                    where: {
                        $or: [{
                            userName,
                        }, {
                            phone: userName,
                        }],
                    },
                    include: [
                        domain.Role,
                        {
                            model: domain.UserSuperCategory,
                            include: [{
                                model: domain.MstSuperCategory,
                            }],
                        },
                        {
                            model: domain.UserRegion,
                            include: [{
                                model: domain.MstRegion,
                            }],
                        },
                    ],
                });

            

            if (!user) throw new Error('Invalid Username or phone number');

            if (user.isAccountLocked) {
                throw new Error(
                    'Your account is locked.Please contact to site admin.',
                );
            }

            if (!user.isEmailVerified) {
                throw new Error(
                    'Your account is inactive.Please verify your email.',
                );
            }

            if (user.userType === 'employee' && user.roleId === 0) {
                throw new Error('Invalid user');
            }

            if (data.device && data.deviceToken) {
                await user.update({
                    device: data.device,
                    deviceToken: data.deviceToken,
                });
            }

            if (user.role && user.role.name === 'superadmin') {
                if (!user.isValidPassword(password)) {
                    throw new Error('Authentication failed. Wrong password.');
                }
            } else if (user.userType && user.userType === 'vendor') {
                if (!user.isValidPassword(password)) {
                    throw new Error('Authentication failed. Wrong password.');
                }

                console.log(user);
                const vendor = await domain.Vendor.findOne({
                    where: {
                        userId: user.id,
                    },
                });

                if (vendor) {
                    user.dataValues.vendor = vendor;
                }
            } else if (process.env.NODE_ENV === 'production') {
                const response = await configHolder.requestUtility('POST', `${process.env.BBQ_API_HOST_1}/Login`, {
                    UserName: user.userName,
                    Password: password,
                });
                console.log('erp response', response);
                if (response && response.Message !== 'Success') throw new Error('Authentication failed. Wrong password.');
            }

            domain.Log.createChangeLog({
                userId: user.dataValues.id,
                type: 'login',
                model: domain.User,
            });

            return createJWTTokenAndSendResponse(user, callback);
        } catch (err) {
            return callback(err);
        }
    };

    /*
     * This service is used to initiate change password process.
     * finds the user through email.
     * If user exists, generate forgot Password token
     * send it to user through email.
     */
    const forgotPassword = async (email, res, callback) => {
        try {
            // const user = await domain.User.findByEmail(email);
            const user = await domain.User.findOne({
                where: {
                    $or: [{
                        email,
                    }, {
                        phone: email,
                    }],
                },
            });

            if (!user) throw new Error("User doesn't exist");

            const {
                token,
            } = await tokenService.create(
                user.id,
                'forgotpassword',
            );

            if (!token) {
                throw new Error(
                    configHolder.messages.error.internalServerError,
                );
            }

            return callback(null, {
                message: 'Reset password link has been sent to your mail.Please check it.',
                token,
            });
        } catch (err) {
            return callback(err);
        }
    };

    const resetPassword = async (token, newPassword, res, callback) => {
        try {
            const tokenObj = await tokenService.get(token);

            if (!tokenObj) throw new Error('Invalid token.');

            const success = await domain.User.updatePassword(
                tokenObj.userId,
                newPassword,
            );

            if (!success) {
                throw new Error(
                    configHolder.messages.error.internalServerError,
                );
            }

            await tokenService.deleteToken(token);

            return callback(null, {
                message: 'Password successfully changed.',
            });
        } catch (err) {
            return callback(err);
        }
    };

    /*
     * This function is used to verify email.
     * find the user through registration token
     * if token is valid , activate the user account
     * delete the registration token
     */
    const verifyEmail = async (token, res, callback) => {
        try {
            const data = await tokenService.get(token);

            if (!data) throw new Error('Token Expired');

            const success = await domain.User.activateAccount(data.User.id);

            if (!success) {
                throw new Error(
                    configHolder.messages.error.internalServerError,
                );
            }

            await tokenService.deleteToken(token);

            return callback(null, {
                message: 'success',
            });
        } catch (err) {
            return callback(err);
        }
    };

    const logout = async (loggedInUser, type = 'web', callback) => {
        try {
            domain.Log.createChangeLog({
                userId: loggedInUser.id,
                model: domain.User,
                type: 'logout',
            });

            if (type === 'mobile') {
                await domain.User.update({
                    deviceToken: null,
                }, {
                    where: {
                        id: loggedInUser.id,
                    },
                });
            }
            return callback(null, {
                message: 'User successfully logged out.',
            });
        } catch (err) {
            return callback(err);
        }
    };

    const validateToken = async (user, res, callback) => {
        try {
            return createJWTTokenAndSendResponse(user, callback);
        } catch (err) {
            return callback(err);
        }
    };


    const stealthLogin = async (data, res, callback) => {
        try {
            if (data && !data.userId) throw new Error('UserId not found');

            const user = await domain.User.findOne({
                where: {
                    id: data.userId,
                },
                include: [{
                        model: domain.Role,
                    },
                    {
                        model: domain.UserSuperCategory,
                        include: [{
                            model: domain.MstSuperCategory,
                        }],
                    },
                    {
                        model: domain.UserRegion,
                        include: [{
                            model: domain.MstRegion,
                        }],
                    },
                ],
            });

            if (user.userType && user.userType === 'vendor') {
                const vendor = await domain.Vendor.findOne({
                    where: {
                        userId: user.id,
                    },
                });

                if (vendor) {
                    user.dataValues.vendor = vendor;
                }
            }

            return createJWTTokenAndSendResponse(user, callback);
        } catch (err) {
            return callback(err);
        }
    };

    return {
        login,
        forgotPassword,
        resetPassword,
        verifyEmail,
        logout,
        validateToken,
        stealthLogin,
    };
}());
