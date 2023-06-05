const fields = require('./fields');

const userSuperCategorySchema = SequelizeConnect.define('UserSuperCategory', fields, {
    tableName: 'user-super-category',
});

module.exports = userSuperCategorySchema;
