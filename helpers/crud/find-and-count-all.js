const parseInclude = require('../utilities/parse-include');

module.exports = async function (req, res, model, callback) {
    try {
        const queries = parseInclude(req);

        // queries.distinct = true;

        const { rows, count } = await model.findAndCountAll(queries);

        return callback(null, { data: rows, count });
    } catch (err) {
        return callback(err);
    }
};
