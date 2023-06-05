const fields = require('./fields');

const categoryDeliverytermSchema = SequelizeConnect.define('CategoryDeliveryTerm', fields, {
    tableName: 'category_delivery_term',
});

module.exports = categoryDeliverytermSchema;
