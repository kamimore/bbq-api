const fields = require('./fields');

const contractDocumentSchema = SequelizeConnect.define('ContractDocument', fields, {
    tableName: 'contract_document',
    timestamps: true,
});

module.exports = contractDocumentSchema;
