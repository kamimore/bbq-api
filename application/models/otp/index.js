const OtpSchema = SequelizeConnect.define('token', {
    phone: {
        type: Sequelize.TEXT,
        allowNull: false,
        trim: true,
    },
    otp: {
        type: Sequelize.TEXT,
        allowNull: false,
        trim: true,
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        field: 'is_active',
        defaultValue: true,
    },
}, {
    hooks: requireDirectory(module, 'hooks'),
    tableName: 'otp',
});

module.exports = OtpSchema;
