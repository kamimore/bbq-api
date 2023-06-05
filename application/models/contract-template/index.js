const fields = require('./fields');

const contractTemplateSchema = SequelizeConnect.define('ContractTemplate', fields, {
    tableName: 'contract_template',
});

module.exports = contractTemplateSchema;
