module.exports = (function () {
    const send = function (req, res, callback) {
        this.services.smsService.send(req.body, callback);
    };
    const verify = function (req, res, callback) {
        this.services.smsService.verify(req.body, callback);
    };

    return {
        send,
        verify,
    };
}());
