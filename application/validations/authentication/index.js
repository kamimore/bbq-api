const login = {
    body: {
        userName: Joi.string().required(),
        password: Joi.string().required(),
    },
};

const logout = {
    params: {
        token: Joi.string().required().required(),
    },
};

const forgotPassword = {
    body: {
        email: Joi.string().email().required(),
    },
};

const resetPassword = {
    body: {
        token: Joi.string().required(),
        newPassword: Joi.string().required(),
    },
};

const verifyEmail = {
    params: {
        token: Joi.string().required(),
    },
};

const validateAuthToken = {
    params: {
        token: Joi.string().required(),
    },
};

// const registerUser = {
//     body: {
//         firstName: Joi.string().required(),
//         // lastName: Joi.string().required(),
//         email: Joi.string().email().required(),
//         password: Joi.string().min(6).max(30).required(),
//     },
// };

const registerVendor = {
    body: {
        companyName: Joi.string().required(),
        fullName: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        // password: Joi.string().required(),
    },
};

module.exports = {
    login,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    validateAuthToken,
    // registerUser,
    registerVendor
};

// password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).min(6).max(30)
// .required(),