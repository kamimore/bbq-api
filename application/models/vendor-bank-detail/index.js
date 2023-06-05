const fields = require('./fields');

const vendorBankDetailSchema = SequelizeConnect.define('VendorBankDetail', fields, {
    tableName: 'vendor_bank_detail',
});

module.exports = vendorBankDetailSchema;
