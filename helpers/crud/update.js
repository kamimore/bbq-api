const setOptions = require('../utilities/set-options');
const parseInclude = require('../utilities/parse-include');
const { cloneDeep } = require('lodash');

module.exports = async (req, res, model, callback) => {
    try {
        let options = null;

        if (req.params.id) {
            options = setOptions(req);

            const item = await model.findOne(options);

            const oldItem = cloneDeep(item);

            if (!item) throw new Error('Item not found.');

            const newItem = await item.update(req.body);

            const entity = model ? model.getTableName() : '';

            if (entity === 'user') {
                delete item.password;
                delete item.salt;

                if (item && item.dataValues) {
                    delete item.dataValues.password;
                    delete item.dataValues.salt;
                }
            }
            if (req.loggedInUser && req.loggedInUser.id) {
                domain.Log.createChangeLog({
                    userId: req.loggedInUser.id,
                    model,
                    newItem: newItem.dataValues,
                    oldItem: oldItem.dataValues,
                    type: 'edit',
                    logWhitelist: null,
                });
            }

            return callback(null, newItem);
        }

        options = parseInclude(req);
        options.returning = true;
        const result = await model.update(req.body, options);

        return callback(null, result[1]);
    } catch (err) {
        return callback(err);
    }
};
