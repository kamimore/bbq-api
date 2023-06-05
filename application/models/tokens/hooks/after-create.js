const {
    capitalize,
} = require('lodash');
const smsService = require('../../../controller-service-layer/services/common/SmsService');

function getTemplateDetails(user, type, token) {
    switch (type) {
        case 'registeration':
            return {
                subject: 'Welcome to Barbeque Nation',
                    template: 'welcome-email',
                    locals: {
                        name: capitalize(user.fullName),
                        username: user.phone,
                        password: user.tempPassword,
                        link: `${process.env.FRONTEND_HOST}/login`,
                    },
            };
        case 'forgotpassword':
            return {
                subject: 'Reset Password',
                    template: 'reset-password',
                    locals: {
                        name: capitalize(user.fullName),
                        link: `${process.env.FRONTEND_HOST}/reset-password/${token}`,
                    },
            };
        case 'send_link_to_vendor':
            return {
                subject: 'Welcome to Barbeque Nation',
                    template: 'send-link-to-vendor',
                    locals: {
                        name: capitalize(user.fullName),
                        username: user.phone,
                        link: `${process.env.FRONTEND_HOST}/reset-password/${token}`,
                    },
            };
        default:
            return null;
    }
}

module.exports = async (instance) => {
    const {
        type,
        userId,
        token,
    } = instance.dataValues;

    try {
        const user = await domain.User.findById(userId);

        if (user && getTemplateDetails(user, type, token)) {
            Logger.info('Sending mail for ', type);

            const {
                subject,
                template,
                locals,
            } = getTemplateDetails(user, type, token);

            if (user.email) {
                configHolder.emailUtil.sendEmail('html', user.email, subject, null, template, locals);
            }

            if (user.phone && type === 'forgotpassword') {
                smsService.send({
                    phone: user.phone,
                }, f => f);
            }

            // Sending login detail to vendor phone
            if (user.phone && type === 'registeration') {
                const message = `Thank You for your registration, we will get back to you shortly. Your username is ${user.phone}`;
                configHolder.smsUtility.sendSms(user.phone, message);
            }

            // Send link to vendor
            if (user.phone && type === 'send_link_to_vendor') {
                const message = `Welcome to Barbeque Nation.\nYour username is ${user.phone}.\nPlease click on the link to set your password: \n${locals.link} Team BarbequeNation.`;
                configHolder.smsUtility.sendSms(user.phone, message);
            }
        } else {
            Logger.info('Not sending mail for type', type);
        }

        return Promise.resolve(instance);
    } catch (err) {
        return Promise.reject(err);
    }
};
