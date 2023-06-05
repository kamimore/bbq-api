const userService = require('./UserService');
const tokenService = require('./TokenService');

/*
{
    "companyName" : "",
    "fullName": "",
    "email": "",
    "phone": "",
    type: "", // external, internal
    registeredById : ""
}
*/
module.exports = (function () {
    const registerVendor = async (data, callback) => {
        try {
            const user = await domain.User.findOne({
                where: {
                    phone: data.phone,
                },
            });

            if (user) throw new Error('Your email or phone number is not unique');

            const newUser = await userService.create(data, 'vendor');

            if (!newUser) throw new Error(configHolder.messages.error.internalServerError);

            const vendor = await domain.Vendor.create({
                userId: newUser.id,
                companyName: data.companyName,
                type: data.type || 'external',
                registeredById: data.registeredById || null,
            });

            if (!vendor) throw new Error('Unable to create new vendor');

            const {
                token,
            } = await tokenService.create(newUser.dataValues.id, 'registeration');

            if (!token) throw new Error(configHolder.messages.error.internalServerError);

            return callback(null, {
                vendor,
                token,
                message: 'Successfully registered.Please check your email/phone for username and password',
            });
        } catch (err) {
            return callback(err);
        }
    };

    return {
        registerVendor,
    };
}());
