const fields = require('./fields');

const mstVendorTypeSchema = SequelizeConnect.define('MstVendorType', fields, {
    tableName: 'mst_vendor_type',
});

module.exports = mstVendorTypeSchema;
