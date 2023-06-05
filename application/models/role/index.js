const fields = require('./fields');

const roleSchema = SequelizeConnect.define('role', fields, {
    tableName: 'role',
});

module.exports = roleSchema;
