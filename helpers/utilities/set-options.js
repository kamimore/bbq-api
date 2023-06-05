
module.exports = (req, idFieldName, options) => {
    if (!options) {
        options = {};
    }
    if (!idFieldName) {
        idFieldName = 'id';
    }
    options.where = {};
    options.where[idFieldName] = req.params.id;

    return options;
};
