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
    text: {
        type: Sequelize.TEXT,
        field: 'text',
        trim: true,
    },
    createdById: {
        type: Sequelize.INTEGER,
        field: 'created_by_id',
        allowNull: false,
    },
};