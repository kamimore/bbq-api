const fields = require('./fields');

const mstdeliveryTermSchema = SequelizeConnect.define('MstDeliveryTerm', fields, {
    tableName: 'mst_delivery_term',
});

module.exports = mstdeliveryTermSchema;
