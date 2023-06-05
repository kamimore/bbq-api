const helpers = requireDirectory(module, '../../helpers');

module.exports = function (model) {
    const get = function (req, res, callback) {
        helpers.crud.get(req, res, model, callback);
    };

    const list = function (req, res, callback) {
        helpers.crud.list(req, res, model, callback, 'get');
    };

    const update = function (req, res, callback) {
        helpers.crud.update(req, res, model, callback);
    };

    const remove = function (req, res, callback) {
        helpers.crud.delete(req, res, model, callback);
    };

    const create = function (req, res, callback) {
        helpers.crud.create(req, res, model, callback);
    };

    const count = function (req, res, callback) {
        helpers.crud.count(req, res, model, callback);
    };

    const findAndCountAll = function (req, res, callback) {
        helpers.crud.findAndCountAll(req, res, model, callback);
    };

    const getWithPost = function (req, res, callback) {
        helpers.crud.list(req, res, model, callback, 'post');
    };

    return {
        create,
        get,
        list,
        update,
        remove,
        count,
        findAndCountAll,
        getWithPost,
    };
};
