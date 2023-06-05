module.exports = (function () {
    const login = function (req, res, callback) {
        console.log(req.body)
        const { userName, password } = req.body;
        this.services.authenticationService.login(userName, password, req.body, res, callback);
    };

    const forgotPassword = function (req, res, callback) {
        this.services.authenticationService.forgotPassword(req.body.email, res, callback);
    };

    const resetPassword = function (req, res, callback) {
        const { token, newPassword } = req.body;
        this.services.authenticationService.resetPassword(token, newPassword, res, callback);
    };

    const verifyEmail = function (req, res, callback) {
        this.services.authenticationService.verifyEmail(req.params.token, res, callback);
    };

    const logout = function (req, res, callback) {
        this.services.authenticationService.logout(req.loggedInUser, req.query.type, callback);
    };

    const validateToken = async function (req, res, callback) {
        this.services.authenticationService.validateToken(req.loggedInUser.dataValues, res, callback);
    };

    const stealthLogin = async function (req, res, callback) {
        this.services.authenticationService.stealthLogin(req.body, res, callback);
    };

    return {
        forgotPassword,
        resetPassword,
        login,
        verifyEmail,
        validateToken,
        logout,
        stealthLogin,
    };
}());
