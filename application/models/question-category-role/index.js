const fields = require('./fields');

const questionCategoryRoleSchema = SequelizeConnect.define('question_category_role', fields, {
    tableName: 'question_category_role',
});

module.exports = questionCategoryRoleSchema;
