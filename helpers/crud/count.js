module.exports = async function (req, res, model, callback) {
    try {
        const query = req.query ? req.query : {};

        const items = await model.count(query);

        return callback(null, items);
    } catch (err) {
        return callback(err);
    }
};
