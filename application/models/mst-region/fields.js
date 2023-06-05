module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.TEXT,
        field: 'name',
        allowNull: false,
        trim: true,
    },
};
