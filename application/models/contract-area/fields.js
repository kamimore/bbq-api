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
    areaId: {
        type: Sequelize.INTEGER,
        field: 'area_id',
        allowNull: false,
    },
};
