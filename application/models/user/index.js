const fields = require('./fields');

const userSchema = SequelizeConnect.define('User', fields, {
    hooks: requireDirectory(module, 'hooks'),
    scopes: requireDirectory(module, 'scopes'),
    tableName: 'user',
});

Object.assign(userSchema, requireDirectory(module, 'class-methods'));

Object.assign(userSchema.prototype, requireDirectory(module, 'instance-methods'));

module.exports = userSchema;
