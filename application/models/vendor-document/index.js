const fields = require('./fields');

const vendorDocumentSchema = SequelizeConnect.define('VendorDocument', fields, {
    tableName: 'vendor_document',
    timestamps: true,
});

module.exports = vendorDocumentSchema;
