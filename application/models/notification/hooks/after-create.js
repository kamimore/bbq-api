const {
    capitalize,
} = require('lodash');

// vendor_registered, other
function getTemplateDetails(type, payload) {
    switch (type) {
        case 'vendor_registered':
            return {
                subject: 'BBQ notification',
                    template: 'common',
                    route: '',
                    // name: capitalize(payload.receiver.fullName),
            };
        case 'vendor_approval_request':
            return {
                subject: 'BBQ notification',
                    template: 'common',
                    route: '',
                    // name: capitalize(payload.receiver.fullName),
            };
        case 'vendor_approval_request_status':
            return {
                subject: 'BBQ notification',
                    template: 'common',
                    route: '',
                    // name: capitalize(payload.receiver.fullName),
            };
        default:
            return {
                subject: 'BBQ notification',
                    template: 'common',
                    route: '',
                    // name: capitalize(payload.receiver.fullName),
            };
    }
}

module.exports = async (instance) => {
    try {
        const {
            userId,
            type,
            payload,
            message,
            title,
        } = instance.dataValues;

        // send email notification
        const templateDetails = getTemplateDetails(type, payload);
        const user = await domain.User.findOne({
            where: {
                id: userId,
            },
        });

        if (user) {
            const {
                subject,
                template,
                name,
            } = templateDetails;

            const data = {
                name: user.fullName,
                message: instance.message,
            };

            if (user.email) {
                let emailAppendSMS = message;
                if (type === 'vendor_approval_request_status') {
                    emailAppendSMS = emailAppendSMS.replace('=', '</br>');
                }
                configHolder.emailUtil.sendEmail('html', user.email, instance.title, emailAppendSMS, template, data);
            }

            if (user.phone) {
                configHolder.smsUtility.sendSms(user.phone, message);
            }

            if (user.deviceToken) {
                const notification = {
                    title,
                    message,
                };
                Logger.info(`Sending push notification for --${type}-- to ${user.fullName}`);
                console.log(user.fullName, 'user.fullName');
                console.log(user.deviceToken, 'user.deviceToken');
                configHolder.gcmNotification.sendNotification([user.deviceToken], notification);
            } else {
                Logger.info('Notification not sent');
            }
        }

        // if (payload && templateDetails) {
        //     Logger.info(`Sending mail for ${type} to ${payload.receiver.email}`);

        //     const { subject, template, name } = templateDetails;

        //     const locals = {
        //         name,
        //         message,
        //         // link: `${process.env.FRONTEND_HOST}/${route}/${token}`,
        //     };

        //     await configHolder.emailUtil.sendEmail('html', data.receiver.email, subject, null, template, locals);
        // } else {
        //     Logger.info('Not sending mail for type', type);
        // }

        return Promise.resolve(instance);
    } catch (err) {
        Logger.error(err);
        if (global.Raven) global.Raven.captureException(JSON.stringify(err));
        return Promise.reject(err);
    }
};
