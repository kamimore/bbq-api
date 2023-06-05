const cache = require('memory-cache');

const memCache = new cache.Cache();

module.exports = (() => {
    function cacheMiddleware(duration = 600) {
        return (req, res, next) => {
            const key = `__express__${req.originalUrl}` || req.url;

            const cacheContent = memCache.get(key);

            console.log('---------------cacheContent-----------------', !!cacheContent);

            if (cacheContent) {
                res.send(cacheContent);
                return;
            }
            res.sendResponse = res.send;
            res.send = (body) => {
                memCache.put(key, body, duration * 10000);
                res.sendResponse(body);
            };
            next();
        };
    }

    return {
        cacheMiddleware,
    };
})();
