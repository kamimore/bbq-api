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
    regionId: {
        type: Sequelize.INTEGER,
        field: 'region_id',
        allowNull: false,
    },
};
