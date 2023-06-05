module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.TEXT,
        trim: true,
    },
    stateId: {
        type: Sequelize.INTEGER,
        field: 'state_id',
    },
};
