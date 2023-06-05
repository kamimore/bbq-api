module.exports = function (dir) {
    const Layers = require('./layers').Express;
    const wiring = require('../router');
    new Layers(app, router, dir + '/application/controller-service-layer', wiring);
}
