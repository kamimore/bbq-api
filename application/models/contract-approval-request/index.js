const fields = require('./fields');

const contractApprovalRequestSchema = SequelizeConnect.define('contractApprovalRequest', fields, {
    tableName: 'contract_approval_request',
    hooks: requireDirectory(module, 'hooks'),
});

module.exports = contractApprovalRequestSchema;
