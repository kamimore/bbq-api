const setOptions = require('../utilities/set-options');

module.exports = async (req, res, model, callback) => {
    if (!req.params.id) throw new Error('Invalid payload.Id is missing');

    const options = setOptions(req);

    try {
        const item = await model.findOne(options);

        const entity = model ? model.getTableName() : '';

        if (entity === 'user') {
            delete item.password;
            delete item.salt;

            if (item && item.dataValues) {
                delete item.dataValues.password;
                delete item.dataValues.salt;
            }
        }

        return callback(null, item);
    } catch (err) {
        return callback(err);
    }
};
