const fields = require('./fields');

const notificationSchema = SequelizeConnect.define('Notification', fields, {
    hooks: requireDirectory(module, 'hooks'),
    tableName: 'notification',
});

Object.assign(notificationSchema, requireDirectory(module, 'class-methods'));

module.exports = notificationSchema;
