module.exports = async function (id, data) {
    try {
        const user = await domain.User.findById(id);

        return user.update(data);
    } catch (err) {
        return Promise.reject(err);
    }
};
