module.exports = async function (id) {
    return domain.User.update({
        isEmailVerified: true,
    }, {
        where: {
            id,
        },
    });
};