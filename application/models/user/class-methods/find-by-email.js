module.exports = async (email) => {
    const query = {
        where: {
            email: email.toLowerCase(),
        },
        include: [domain.Role],
    };

    const user = await domain.User.findOne(query);

    if (user) {
        let role = null;
        if (user.roleId > 0) {
            role = user.role.name;
        }
        user.role = role;
        user.dataValues.role = role;
    }

    return user;
};
