module.exports = (res, responseObject, message, error, status) => {
    res.status(status).send({
        error,
        message,
        response: responseObject,
        status,
    });
    res.end();
};
