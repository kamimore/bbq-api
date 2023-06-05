const fields = require('./fields');

const questionSchema = SequelizeConnect.define('question', fields, {
    hooks: requireDirectory(module, 'hooks'),
    tableName: 'question',
});

module.exports = questionSchema;
