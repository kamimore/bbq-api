const {
    random,
} = require('lodash');

module.exports = (function () {
    const send = async (data, callback) => {
        try {
            const otp = random(1000, 9999);

            const sms = await domain.Otp.create({
                phone: data.phone,
                otp,
            });

            if (!sms) throw new Error('Unable to create otp!');

            const message = `${otp} is the OTP to verify your mobile number @BBQ Team.`;

            configHolder.smsUtility.sendSms(data.phone, message);

            return callback(null, {
                message: 'OTP sent',
            });
        } catch (err) {
            return callback(err);
        }
    };

    const verify = async (data, callback) => {
        try {
            const otp = await domain.Otp.findOne({
                where: {
                    phone: data.phone,
                    otp: data.otp,
                },
            });

            if (!otp) throw new Error('Otp incorrect!');

            const status = await domain.Otp.update({
                isActive: false,
            }, {
                where: {
                    phone: data.phone,
                },
            });

            if (!status) throw new Error('Something went wrong!');

            return callback(null, {
                message: 'Otp successfully verified.',
            });
        } catch (err) {
            return callback(err);
        }
    };

    return {
        send,
        verify,
    };
}());
