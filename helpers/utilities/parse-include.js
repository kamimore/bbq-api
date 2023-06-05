const qs = require('qs');
const {
    has,
} = require('lodash');

function parseNestedInclude(query) {
    const includes = Array.isArray(query.include) ? query.include : query.include.split(',');

    const include = [];

    includes.forEach((item) => {
        const data = {};

        Object.assign(data, item);

        if (has(item, 'required')) data.required = (item.required === 'true');

        if (item.model) {
            data.model = domain[item.model];
        } else {
            data.model = domain[item['[model]']];
        }

        if (item.include && item.include.length) {
            Object.assign(data, {
                include: parseNestedInclude(item),
            });
        }

        include.push(data);
    });
    return include;
}

module.exports = (req, method) => {
    const { url } = req;
    let parsedQuery = {};

    if (method === 'post') {
        parsedQuery = req.body;
    } else {
        const queryString = url.split('?');

        parsedQuery = qs.parse(queryString[1], {
            ignoreQueryPrefix: true,
            depth: 500,
            parameterLimit: 100000,
        });
    }

    // console.log('parsedQuery', parsedQuery);

    const queries = Object.assign({}, parsedQuery);

    if (has(parsedQuery, 'required')) queries.required = (parsedQuery.required === 'true');

    if (parsedQuery.include && parsedQuery.include.length) {
        Object.assign(queries, {
            include: parseNestedInclude(parsedQuery),
        });
    }

    if (Object.keys(queries).length === 0) {
        return {
            where: {},
        };
    }

    // console.log('queries', queries);

    return queries;
};
