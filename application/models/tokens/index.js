const TokensSchema = SequelizeConnect.define('token', {
    token: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        allowNull: false,
    },
    type: {
        type: Sequelize.TEXT, // registeration, forgotpassword, send_link_to_vendor
        defaultValue: 'forgotpassword',
        trim: true,
    },
}, {
    hooks: requireDirectory(module, 'hooks'),
    tableName: 'token',
});

module.exports = TokensSchema;
