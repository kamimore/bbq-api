module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    termConditionId: {
        type: Sequelize.INTEGER,
        field: 'term_condition_id',
        defaultValue: 0,
    },
    subCategoryId: {
        type: Sequelize.INTEGER,
        field: 'sub_category_id',
        defaultValue: 0,
    },
};
