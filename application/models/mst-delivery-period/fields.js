module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    value: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    period: {
        type: Sequelize.TEXT,
        allowNull: false,
        trim: true,
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        field: 'is_deleted',
        defaultValue: false,
    },
};
