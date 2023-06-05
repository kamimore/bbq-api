const fields = require('./fields');

const contractCategorySchema = SequelizeConnect.define('ContractCategory', fields, {
    tableName: 'contract_category',
});

module.exports = contractCategorySchema;
