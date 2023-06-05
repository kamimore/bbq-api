module.exports = (function () {
    const sendLoginLink = function (req, res, callback) {
        this.services.vendorService.sendLoginLink(req.body, callback);
    };

    const getVendorList = function (req, res, callback) {
        this.services.vendorService.getVendorList(req.body, callback)
    };

    return {
        sendLoginLink,
        getVendorList,
    };
}());
