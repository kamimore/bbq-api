const fields = require('./fields');

const mstItemCategorySchema = SequelizeConnect.define('MstItemCategory', fields, {
    tableName: 'mst_item_category',
});

module.exports = mstItemCategorySchema;
