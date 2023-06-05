module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: Sequelize.TEXT,
        trim: true,
    },
    assignedToId: {
        type: Sequelize.INTEGER, // userId
        field: 'assigned_to_id',
        allowNull: false,
    },
    createdById: {
        type: Sequelize.INTEGER, // userId
        field: 'created_by_id',
        allowNull: false,
    },
    status: {
        type: Sequelize.TEXT, // pending, rejected, completed
        trim: true,
        defaultValue: 'pending',
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        field: 'is_deleted',
        defaultValue: false,
    },
};
