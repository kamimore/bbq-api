module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    code: {
        type: Sequelize.TEXT,
        trim: true,
    },
    name: {
        type: Sequelize.TEXT,
        trim: true,
    },
    superCategoryId: {
        type: Sequelize.INTEGER,
        field: 'super_category_id',
        allowNull: false,
    },
};
