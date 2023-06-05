const fields = require('./fields');

const categoryAdvancePaymentSchema = SequelizeConnect.define('CategoryAdvancePayment', fields, {
    tableName: 'category_advance_payment',
});

module.exports = categoryAdvancePaymentSchema;
