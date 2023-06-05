const fields = require('./fields');

const contractSchema = SequelizeConnect.define('Contract', fields, {
    tableName: 'contract',
    hooks: requireDirectory(module, 'hooks'),
});

module.exports = contractSchema;
