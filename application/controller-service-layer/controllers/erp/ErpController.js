const erpService = require('../../services/common/BBQ-ERPService');

module.exports = (function () {
    const fetchData = function (req, res, callback) {
        return erpService.fetchData(callback);
    };

    const validateVendor = function (req, res, callback) {
        return erpService.validateVendor(req.body, callback);
    };

    const validateContract = function (req, res, callback) {
        return erpService.validateContract(req.body, callback);
    };

    return {
        fetchData,
        validateVendor,
        validateContract,
    };
}());
