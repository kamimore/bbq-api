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
    isActive: {
        type: Sequelize.BOOLEAN,
        field: 'is_active',
        defaultValue: true,
    },
};
