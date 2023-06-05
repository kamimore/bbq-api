const fields = require('./fields');

const mstItemSchema = SequelizeConnect.define('MstItem', fields, {
    tableName: 'mst_item',
});

module.exports = mstItemSchema;
