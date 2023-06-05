const jwt = require('jsonwebtoken');

module.exports = (function () {
    const create = (data) => {
        if (!data) throw new Error('data not found');

        return jwt.sign(data, process.env.APP_SECRET, { expiresIn: process.env.JWT_EXPIRE_TIME });
    };

    const get = (token) => {
        if (!token) throw new Error('Token not found');

        return jwt.verify(token, process.env.APP_SECRET);
    };

    return {
        create,
        get,
    };
}());
