const fields = require('./fields');

const CategoryTermConditionSchema = SequelizeConnect.define('CategoryTermCondition', fields, {
    tableName: 'category_term_condition',
});

module.exports = CategoryTermConditionSchema;
