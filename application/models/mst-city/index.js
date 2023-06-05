const fields = require('./fields');

const mstCitySchema = SequelizeConnect.define('MstCity', fields, {
    tableName: 'mst_city',
});

module.exports = mstCitySchema;
