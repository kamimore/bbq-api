var BaseView = require('./BaseView');

JsonView = function () {};

JsonView.prototype = new BaseView();

/**
 * Simply sends the serialised object.
 *
 * @param {Object}  req     The request object.
 * @param {Object}  res     The response object.
 * @param {Object}  result  The object(s) being rendered.
 */
JsonView.prototype.render = function (req, res, result) {
	var date = new Date();
	res.send({
		error: false,
		object: result,
		message: "",
		extendedMessage: "",
		status: 200,
		timeStamp: date.getTime()
	});
};

module.exports = new JsonView;