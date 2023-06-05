module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    contractId: {
        type: Sequelize.INTEGER,
        field: 'contract_id',
        allowNull: false,
    },
    categoryId: {
        type: Sequelize.INTEGER,
        field: 'category_id',
        allowNull: false,
    },
};
