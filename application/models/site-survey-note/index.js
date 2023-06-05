const fields = require('./fields');

const siteSurveyNoteSchema = SequelizeConnect.define('SiteSurveyNote', fields, {
    tableName: 'site_survey_note',
    hooks: requireDirectory(module, 'hooks'),
});

module.exports = siteSurveyNoteSchema;