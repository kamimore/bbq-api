const ejs = require('ejs');
const sgMail = require('@sendgrid/mail');
const {
    omit,
} = require('lodash');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const renderFile = promisify(ejs.renderFile).bind(ejs);

module.exports = (function () {
    function getEmailTemplate(name, data) {
        Object.assign(data, {
            logoUrl: process.env.LOGO,
        });
        const filename = path.join(__dirname, `../templates/${name}.ejs`);
        return renderFile(filename, data);
    }

    const sendEmail = async (type = 'text', to, subject, text = '', templateName, data) => {
        Logger.info('text', text, 'receiver', to, 'subject', subject, 'templateName', templateName);

        if (!to) return null;

        const options = {
            from: {
                name: 'BBQ Support',
                email: process.env.EMAIL_FROM,
            },
            to,
            subject,
        };

        if (type === 'html' && data) {
            options.html = await getEmailTemplate(templateName, data);
        } else if (type === 'text' && text) {
            options.text = text;
        }

        domain.Log.createChangeLog({
            newItem: omit(options, ['html']),
            type: 'email',
        });

        return sgMail.send(options);
    };

    return {
        sendEmail,
    };
}());
