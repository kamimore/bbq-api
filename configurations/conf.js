const dotenv = require('dotenv');

module.exports = () => {
    const roles = ['superadmin', 'admin', 'bd'];

    const accessLevels = {
        anonymous: ['authenticated', 'admin', 'superadmin'],
        authenticated: ['authenticated', 'admin', 'superadmin'],
        bd: ['bd', 'admin', 'superadmin'],
        admin: ['admin', 'superadmin'],
        superadmin: ['superadmin']
    };

    dotenv.config({
        path: `${__dirname}/../env/${process.env.NODE_ENV}.env`,
    });

    return {
        roles,
        accessLevels,
    };
};
