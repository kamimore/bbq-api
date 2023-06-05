const validate = require('express-validation');
const validationSchema = require('../../application/validations/index');
const middleware = require('../../middlewares/authentication');
const errorHandler = require('../../middlewares/error-handler');
const commonController = require('./commonController');
const {
    each,
    has,
} = require('lodash');
const {
    camelize
} = require('underscore.string');

module.exports = function (apiName, {
    controllers,
    views
}, model, auth = null, skipApi = []) {
    const actualController = controllers[`${camelize(apiName, true)}Controller`];

    const controller = {
        ...commonController(model),
        ...actualController
    };

    views = {
        json: views.jsonView
    };

    const apis = {};

    apis[`/api/v1/${apiName}/get`] = [];

    each({
        POST: 'getWithPost'
    }, (action, httpMethod) => {
        apis[`/api/v1/${apiName}/get`].push({
            method: httpMethod,
            action: controller[action],
            middleware: [
                middleware.auth('authenticated'),
                // validate(validationSchema.common['get']),
                errorHandler,
            ],
            views,
        });
    })

    apis[`/api/v1/${apiName}`] = [];

    each({
        GET: 'list',
        POST: 'create',
        PUT: 'update',
        DELETE: 'remove',
    }, (action, httpMethod) => {
        const authentication = has(auth, action) ? auth[action] : 'authenticated';

        if (!skipApi.includes(action)) {
            apis[`/api/v1/${apiName}`].push({
                method: httpMethod,
                action: controller[action],
                middleware: [
                    middleware.auth(authentication),
                    validate(validationSchema.common[action]),
                    errorHandler,
                ],
                views,
            });
        }
    });

    each({
        'find-and-count': 'findAndCountAll',
        count: 'count',
    }, (value, key) => {
        const authentication = has(auth, value) ? auth[value] : 'authenticated';

        if (!skipApi.includes(value)) {
            apis[`/api/v1/${apiName}/${key}`] = [{
                method: 'GET',
                action: controller[value],
                middleware: [
                    middleware.auth(authentication),
                    validate(validationSchema.common[value]),
                    errorHandler,
                ],
                views,
            }];
        }
    });

    apis[`/api/v1/${apiName}/:id`] = [];

    each({
        GET: 'get',
        PATCH: 'update',
        PUT: 'update',
        DELETE: 'remove',
    }, (action, httpMethod) => {
        const authentication = has(auth, action) ? auth[action] : 'authenticated';

        if (!skipApi.includes(action)) {
            apis[`/api/v1/${apiName}/:id`].push({
                method: httpMethod,
                action: controller[action],
                middleware: [
                    middleware.auth(authentication),
                    validate(validationSchema.common[action]),
                    errorHandler,
                ],
                views,
            });
        }
    });

    return apis;
};
