const fields = require('./fields');

const mstStateSchema = SequelizeConnect.define('MstState', fields, {
    tableName: 'mst_state',
});

module.exports = mstStateSchema;
