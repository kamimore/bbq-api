module.exports = (function () {
    const registerVendor = function (req, res, callback) {
        this.services.registrationService.registerVendor(req.body, callback);
    };

    return {
        registerVendor,
    };
}());
