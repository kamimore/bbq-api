const uuid = require('node-uuid');

module.exports = (function () {
    const create = async (userId, type = 'registeration') => {
        if (!userId) return Promise.reject(new Error('userId not found'));

        return domain.Token.create({ userId, token: uuid.v1(), type });
    };

    const get = (token) => {
        if (!token) return Promise.reject(new Error('Token not found'));

        return domain.Token.findOne({ where: { token }, include: [domain.User] });
    };

    const deleteToken = (token) => {
        if (!token) return Promise.reject(new Error('Token not found'));

        return domain.Token.destroy({ where: { token } });
    };

    return {
        create,
        get,
        deleteToken,
    };
}());
