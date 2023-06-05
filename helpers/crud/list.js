const parseInclude = require('../utilities/parse-include');

module.exports = async function (req, res, model, callback, method) {
    try {
        const queries = parseInclude(req, method);

        const items = await model.findAll(queries);

        return callback(null, items);
    } catch (err) {
        return callback(err);
    }
};
