ErrorView = function (options) {
    var defaults = {
        showStack: false,
        showMessage: false
    };
    for (var p in options) {
        defaults[p] = options[p];
    }
    this.title = "Error";
    this.options = defaults;
};

/**
 * Renders an Error.
 *
 * Renders an error to either text/html or application/json depending on the
 * Accept header of the request.
 *
 * @param {Object}  req     The request object.
 * @param {Object}  res     The response object.
 * @param {Object}  error   The error to render.
 */
ErrorView.prototype.render = function (req, res, error) {
    this.getErrorOutput(error, function (outError) {
        var date = new Date();
        res.send({
            error: true,
            object: {
                message: outError.errors? outError.errors[0].message: '',
            },
            message: outError.message,
            extendedMessage: outError.errors,
            timeStamp: date.getTime(),
            status: outError.status
        }, outError.status)
    });
}

/**
 * Returns a sanitised error message for an Error.
 *
 * @param {Object}      error       The error to santitise.
 * @param {Function}    callback    The callback function.
 */
ErrorView.prototype.getErrorOutput = function (error, callback) {
    if (global.Raven) global.Raven.captureException(JSON.stringify(error));
    
    if (process.env.ENABLE_EXPRESS_LOG === 'true') console.log(error);;

    if (!error.status) {
        error.status = 500;
    }

    if (!error.message) {
        error.message = configHolder.messages.error.internalServerError;
    }

    if (!this.options.showStack || !this.options.dumpExceptions) {
        delete error.stack;
    }

    callback(error);
};

module.exports = new ErrorView();
