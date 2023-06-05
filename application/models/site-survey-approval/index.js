const fields = require('./fields');

const siteSurveyApprovalSchema = SequelizeConnect.define('SiteSurveyApproval', fields, {
    tableName: 'survey_approval',
    hooks: requireDirectory(module, 'hooks'),
});

module.exports = siteSurveyApprovalSchema;