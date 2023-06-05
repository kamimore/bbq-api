const fields = require('./fields');

const mstStructureSchema = SequelizeConnect.define('MstStructure', fields, {
    tableName: 'mst_structure',
});

module.exports = mstStructureSchema;
