const crypto = require('crypto');

module.exports = function (salt, value) {
    return crypto.createHmac('sha1', salt).update(value).digest('hex');
};