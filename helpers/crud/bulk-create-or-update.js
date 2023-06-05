module.exports = async (req, res, model, callback) => {
    const items = req.body;

    try {
        if (!(items instanceof Array)) throw new Error('Payload should be an array');

        const newItems = await model.bulkCreate(items, {
            userId: req.loggedInUser.id,
            returning: true,
            updateOnDuplicate: true,
        });

        return callback(null, newItems);
    } catch (err) {
        return callback(err);
    }
};
