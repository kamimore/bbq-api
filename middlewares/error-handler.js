/* eslint no-unused-vars:0 */
const { humanize } = require('underscore.string');

module.exports = (err, req, res, next) => {
    Logger.info('Error', err);
    res.status(err.status).send({
        error: true,
        object: err.errors[0].messages,
        errorType: err.message,
        message: err.errors.length ? humanize(err.errors[0].messages) : 'Invalid Payload',
        timeStamp: new Date().getTime(),
    }).end();
};