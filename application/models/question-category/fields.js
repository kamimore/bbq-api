module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.TEXT, // 'contact','location','measurement'
        unique: true,
        allowNull: false,
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        field: 'is_deleted',
        defaultValue: false,
    },
    order: {
        type: Sequelize.INTEGER,
    },
};