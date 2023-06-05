const fields = require('./fields');

const questionCategorySchema = SequelizeConnect.define('question_category', fields, {
    tableName: 'question_category',
});

module.exports = questionCategorySchema;
