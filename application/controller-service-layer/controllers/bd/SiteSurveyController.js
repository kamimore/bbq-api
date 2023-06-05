module.exports = (function () {
    const getSurveys = function (req, res, callback) {
        this.services.siteSurveyService.getSurveys(req.loggedInUser, req.query.status, req.query.lastSync, callback);
    };

    const getSurveyDetail = function (req, res, callback) {
        this.services.siteSurveyService.getSurveyDetail(req.params.id, req.loggedInUser, req.query.roleId, callback);
    };

    const getSurveyStatus = function (req, res, callback) {
        this.services.siteSurveyService.getSurveyStatus(req.loggedInUser.id, callback);
    };

    const getSurveyApprovalRequest = function (req, res, callback) {
        this.services.siteSurveyService.getSurveyApprovalRequest(req.params.id, callback);
    };

    return {
        getSurveys,
        getSurveyDetail,
        getSurveyStatus,
        getSurveyApprovalRequest,
    };
}());
