const fields = require('./fields');

const mstAreaSchema = SequelizeConnect.define('MstArea', fields, {
    tableName: 'mst_area',
});

module.exports = mstAreaSchema;
