const fields = require('./fields');

const mstAdvancePaymentSchema = SequelizeConnect.define('MstAdvancePayment', fields, {
    tableName: 'mst_advance_payment',
});

module.exports = mstAdvancePaymentSchema;
