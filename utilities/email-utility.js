const nodemailer = require('nodemailer');
const ejs = require('ejs');
const {
    omit,
} = require('lodash');

const renderFile = promisify(ejs.renderFile).bind(ejs);

module.exports = (function () {
    // const transporter = nodemailer.createTransport({
    //     service: process.env.EMAIL_SERVICE,
    //     auth: {
    //         user: process.env.EMAIL_USER,
    //         pass: process.env.EMAIL_PASSWORD,
    //     },
    // });
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
            user: 'no-reply@barbequenation.com',
            pass: 'Ranjithkumar',
        },
    });

    function getEmailTemplate(name, data) {
        Object.assign(data, {
            logoUrl: process.env.LOGO,
        });
        const filename = path.join(__dirname, `../templates/${name}.ejs`);
        return renderFile(filename, data);
    }

    const sendEmail = async (type = 'text', to, subject, text = '', templateName, data) => {
        const options = {
            // from: process.env.EMAIL_FROM,
            from: '"BBQ Support" <no-reply@barbequenation.com>',
            to,
            subject,
        };

        try {
            if (type === 'html' && data) {
                options.html = await getEmailTemplate(templateName, data);
            } else if (type === 'text' && text) {
                options.text = text;
            }

            domain.Log.createChangeLog({
                newItem: omit(options, ['html']),
                type: 'email',
            });

            return transporter.sendMail(options);
        } catch (err) {
            console.log(err, 'error in email util');
        }
        // return sendgrid.send_via_sendgrid(options);
    };

    return {
        sendEmail,
    };
}());
