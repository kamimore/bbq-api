const fields = require('./fields');

const vendorSchema = SequelizeConnect.define('Vendor', fields, {
    tableName: 'vendor',
    hooks: requireDirectory(module, 'hooks'),
});

module.exports = vendorSchema;
