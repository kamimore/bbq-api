const fields = require('./fields');

const mstSuperCategorySchema = SequelizeConnect.define('MstSuperCategory', fields, {
    tableName: 'mst_super_category',
});

module.exports = mstSuperCategorySchema;
