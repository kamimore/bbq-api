module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    value: {
        type: Sequelize.INTEGER,
        field: 'value',
        allowNull: false,
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        field: 'is_deleted',
        defaultValue: false,
    },
};
