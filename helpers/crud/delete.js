const setOptions = require('../utilities/set-options');

module.exports = async function (req, res, model, callback) {
    try {
        if (req.params.id) {
            // return callback('Invalid payload.Id is missing');
            const options = setOptions(req);


            const item = await model.findOne(options);

            if (!item) throw new Error('Item not found.');

            await item.destroy();

            if (req.loggedInUser && req.loggedInUser.id) {
                domain.Log.createChangeLog({
                    userId: req.loggedInUser.id,
                    model,
                    newItem: item.dataValues,
                    type: 'delete',
                    logWhitelist: null,
                });
            }

            return callback(null, {
                message: 'successfully deleted the record',
            });
        }
        if (req.body && req.body.length) {
            await model.destroy({ where: { id: req.body } });
            return callback(null, {
                message: 'successfully deleted all the records',
            });
        }
        return callback('Invalid payload. Send Id param or array of id in body');
    } catch (err) {
       return callback(err);
    }
};
