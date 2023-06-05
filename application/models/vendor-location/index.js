const fields = require('./fields');

const vendorLocationSchema = SequelizeConnect.define('VendorLocation', fields, {
    tableName: 'vendor_location',
});

module.exports = vendorLocationSchema;
