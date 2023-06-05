const fields = require('./fields');

const contractAreaSchema = SequelizeConnect.define('ContractArea', fields, {
    tableName: 'contract_area',
});

module.exports = contractAreaSchema;
