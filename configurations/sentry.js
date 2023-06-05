const raven = require('raven');

module.exports = (() => {
    if (process.env.NODE_ENV !== 'development') {
        global.Raven = raven;
        global.Raven.config(process.env.SENTRY_DSN, {
            environment: process.env.NODE_ENV,
            autoBreadcrumbs: true,
        }).install();
    }
})();
