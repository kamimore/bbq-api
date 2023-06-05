module.exports = (function () {
    const createApprovalRequests = function (req, res, callback) {
        this.services.siteSurveyApprovalService.createApprovalRequests(req.loggedInUser.id, req.body, callback);
    };

    return {
        createApprovalRequests,
    };
}());
