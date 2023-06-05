const fields = require('./fields');

const mstProductGroupSchema = SequelizeConnect.define('MstProductGroup', fields, {
    tableName: 'mst_product_group',
});

module.exports = mstProductGroupSchema;
