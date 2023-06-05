const fields = require('./fields');

const vendorApprovalRequestSchema = SequelizeConnect.define('VendorApprovalRequest', fields, {
    tableName: 'vendor_approval_request',
    hooks: requireDirectory(module, 'hooks'),
});

module.exports = vendorApprovalRequestSchema;
