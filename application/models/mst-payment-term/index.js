const fields = require('./fields');

const mstPaymentTermSchema = SequelizeConnect.define('MstPaymentTerm', fields, {
    tableName: 'mst_payment_term',
});

module.exports = mstPaymentTermSchema;
