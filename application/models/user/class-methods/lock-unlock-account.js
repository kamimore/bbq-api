module.exports = async function (userId, isAccountLocked) {
    return domain.User.update({
        isAccountLocked,
    }, {
        where: {
            userId,
        },
    });
};