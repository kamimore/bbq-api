const jwtService = require('../application/controller-service-layer/services/common/JWTService');

module.exports = (() => {
    function canAccess(userRole, accessLevel) {
        if (accessLevel === 'generic') return true;
        const levels = configHolder.config.accessLevels;
        return levels[accessLevel].includes(userRole);
    }

    function auth(accessLevel) {
        return async (req, res, next) => {
            const token = req.get('x-access-token') || null;
            try {
                if ((!token || token === 'null') && ['anonymous', 'generic'].includes(accessLevel)) {
                    req.loggedInUser = null;
                    return next();
                } if (token) {
                    const { userId } = jwtService.get(token);

                    const loggedInUser = await domain.User.findOne({ where: { id: userId }, include: [domain.Role] });

                    /* eslint max-len: 0 */
                    // if (!canAccess(loggedInUser.role.name, accessLevel)) throw new Error(configHolder.messages.error.expireToken);

                    req.loggedInUser = loggedInUser;
                    return next();
                }
                throw new Error(configHolder.messages.error.accessDenied);
            } catch (err) {
                return res.status(401).send({
                    success: false,
                    message: configHolder.messages.error.accessDenied,
                }).end();
            }
        };
    }

    return {
        auth,
    };
})();
