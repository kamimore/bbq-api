module.exports = async function (id, newPassword) {
    try {
        const user = await domain.User.findById(id);

        return user.update({
            password: domain.User.encryptPassword(user.salt, newPassword),
        });
    } catch (err) {
        return Promise.reject(err);
    }
};
