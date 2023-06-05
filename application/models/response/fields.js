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
    siteSurveyId: {
        type: Sequelize.INTEGER,
        field: 'site_survey_id',
        allowNull: false,
    },
    questionId: {
        type: Sequelize.INTEGER,
        field: 'question_id',
        allowNull: false,
    },
    question:{
        type: Sequelize.JSONB,
    },
    roleId: {
        type: Sequelize.INTEGER,
        field: 'role_id',
        allowNull: false,
    },
    response: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
    },
    questionCategoryId: {
        type: Sequelize.INTEGER,
        field: 'question_category_id',
        allowNull: false,
    },
};
