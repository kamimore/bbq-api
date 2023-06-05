module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    siteSurveyId: {
        type: Sequelize.INTEGER,
        field: 'site_survey_id',
        allowNull: false,
    },
    assignedToId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'assigned_to_id',
    },
    assignedById: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'assigned_by_id',
    },
    dueDate: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'due_date',
    },
    status: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: 'pending', // pending, accepted, rejected
    },
    comment: {
        type: Sequelize.TEXT,
        trim: true,
    },
};