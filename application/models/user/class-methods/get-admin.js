module.exports = () => {
    const query = {
        where: {
            role: 'admin',
        },
        attributes: ['id', 'email', 'fullName', 'role', 'profileImage'],
    };
    return domain.User.findOne(query);
};