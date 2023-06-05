const fields = require('./fields');

const mstVendorPostingGroupSchema = SequelizeConnect.define('MstVendorPostingGroup', fields, {
    tableName: 'mst_vendor_posting_group',
});

module.exports = mstVendorPostingGroupSchema;
