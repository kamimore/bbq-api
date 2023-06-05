module.exports = async (req, res, model, callback) => {
    try {
        const item = req.body;
        let newItem = null;

        if ((item instanceof Array)) {
            newItem = await model.bulkCreate(item, {
                returning: true,
            });
        } else {
            newItem = await model.create(item);
        }

        if (req.loggedInUser && req.loggedInUser.id) {
            domain.Log.createChangeLog({
                userId: req.loggedInUser.id,
                model,
                newItem: newItem.dataValues,
                oldItem: null,
                type: 'create',
                logWhitelist: null,
            });
        }

        return callback(null, newItem);
    } catch (err) {
        return callback(err);
    }
};
