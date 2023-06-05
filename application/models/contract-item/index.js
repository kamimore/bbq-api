const fields = require('./fields');

const contractItemSchema = SequelizeConnect.define('ContractItem', fields, {
    tableName: 'contract_item',
});

module.exports = contractItemSchema;
