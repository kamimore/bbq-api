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
    areaId: {
        type: Sequelize.INTEGER,
        field: 'area_id',
        allowNull: false,
    },
};
