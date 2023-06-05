const fields = require('./fields');

const responseSchema = SequelizeConnect.define('response', fields, {
    tableName: 'response',
});

module.exports = responseSchema;
