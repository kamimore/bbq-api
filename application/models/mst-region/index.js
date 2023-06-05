const fields = require('./fields');

const mstRegion = SequelizeConnect.define('MstRegion', fields, {
    tableName: 'mst_region',
});

module.exports = mstRegion;
