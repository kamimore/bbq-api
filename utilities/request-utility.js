const request = require('request-promise');

module.exports = function (method = 'POST', url = '', payload) {
    if(!url) throw new Error('Url not found');

    const options = {
        method,
        uri: url,
        headers: {
            'Content-Type': 'application/json'
        },
        json: true,
    };
    
    if(method === 'POST') options.body = payload;
    if(method === 'GET') options.qs = payload;

    return request(options);
};
