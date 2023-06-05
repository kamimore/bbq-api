const fields = require('./fields');

const mstCategorySchema = SequelizeConnect.define('MstCategory', fields, {
    tableName: 'mst_category',
});

module.exports = mstCategorySchema;
