const fields = require('./fields');

const siteSurveySchema = SequelizeConnect.define('site_survey', fields, {
    hooks: requireDirectory(module, 'hooks'),
    tableName: 'site_survey',
});

module.exports = siteSurveySchema;
