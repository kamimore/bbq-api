module.exports = (function () {
    const sendSms = (phone, message) => {
        const msg = message.replace(' ', '%20');
        console.log(phone, 'phone');
        console.log(message, 'msg');
        // const url = `http://api.msg91.com/api/sendhttp.php?authkey=${process.env.SMS_GATEWAY_API_KEY}&mobiles=${process.env.SMS_GATEWAY_COUNTRY}${phone}&message=${msg}&sender=${process.env.SMS_GATEWAY_SENDER_ID}`;
       // const url = `http://smsp.myoperator.co/api/sendhttp.php?authkey=${process.env.SMS_GATEWAY_API_KEY}&mobiles=${phone}&message=${msg}&sender=${process.env.SMS_GATEWAY_SENDER_ID}&route=4&country=${process.env.SMS_GATEWAY_COUNTRY}`;
        // by rudresh
        const url = `http://smsp.myoperator.co/api/sendhttp.php?authkey=${process.env.SMS_GATEWAY_API_KEY}&mobiles=${phone}&message=${msg}&sender=${process.env.SMS_GATEWAY_SENDER_ID}&route=4&country=${process.env.SMS_GATEWAY_COUNTRY}&DLT_TE_ID=1607100000000062930`;

	console.log('sms url', url);

        domain.Log.createChangeLog({
            type: 'sms',
            newItem: {
                phone,
                message,
                url,
            },
        });

        configHolder.requestUtility('GET', url).then(f => f);
    };

    return {
        sendSms,
    };
}());
