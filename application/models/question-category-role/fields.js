module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    questionCategoryId: {
        type: Sequelize.INTEGER,
        field: 'question_category_id',
        allowNull: false,
    },
    roleId: {
        type: Sequelize.INTEGER,
        field: 'role_id',
        allowNull: false,
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        field: 'is_active',
        defaultValue: true,
    },
};
