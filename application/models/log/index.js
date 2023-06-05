const LogSchema = SequelizeConnect.define('log', {
    userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
    },
    entityId: {
        type: Sequelize.INTEGER,
        field: 'entity_id',
    },
    entity: {
        type: Sequelize.STRING,
        field: 'entity',
        trim: true,
        comment: 'values are table names, such as: user, log, notification',
    },
    type: {
        type: Sequelize.TEXT, // 'create', 'edit', 'delete', 'email', 'login', 'logout', 'sms', 'notification', 'create_vendor_erp', 'create_contract_erp', 'firebase_notification'
        trim: true,
        defaultValue: 'edit',
    },
    oldValue: {
        type: Sequelize.JSONB,
        field: 'old_value',
    },
    newValue: {
        type: Sequelize.JSONB,
        field: 'new_value',
    },
}, {
    tableName: 'log',
});

Object.assign(LogSchema, requireDirectory(module, 'class-methods'));

module.exports = LogSchema;
