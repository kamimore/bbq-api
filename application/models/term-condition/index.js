const fields = require('./fields');

const termConditionSchema = SequelizeConnect.define('TermCondition', fields, {
    tableName: 'term_condition',
});

module.exports = termConditionSchema;
