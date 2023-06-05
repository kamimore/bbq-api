module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        allowNull: false,
    },
    superCategoryId: {
        type: Sequelize.INTEGER,
        field: 'super_category_id',
        allowNull: false,
    },
};
