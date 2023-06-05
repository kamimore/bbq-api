const fields = require('./fields');

const userRegionSchema = SequelizeConnect.define('UserRegion', fields, {
    tableName: 'user_region',
});

module.exports = userRegionSchema;
