const getUser = {
    params: {
        id: Joi.string().required(),
    },
};

const updateUser = {
    params: {
        id: Joi.string().required(),
    },
    body: {
        firstName: Joi.string(),
        // lastName: Joi.string().min(3).max(30),
        email: Joi.string().email(),
        password: Joi.string().min(6).max(30),
    },
};

const deleteUser = {
    params: {
        id: Joi.string().required(),
    },
};

const searchUser = {
    query: {
        value: Joi.string(),
    },
};

const changePassword = {
    body: {
        // oldPassword: Joi.string().min(6).max(30).required(),
        newPassword: Joi.string().min(6).max(30).required(),
    },
};

const changeEmail = {
    body: {
        newEmail: Joi.string().email(),
        password: Joi.string().min(6).max(30).required(),
    },
};

module.exports = {
    getUser,
    updateUser,
    deleteUser,
    searchUser,
    changePassword,
    changeEmail,
};
