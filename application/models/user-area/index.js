const fields = require('./fields');

const userAreaSchema = SequelizeConnect.define('UserArea', fields, {
    tableName: 'user_area',
});

module.exports = userAreaSchema;
