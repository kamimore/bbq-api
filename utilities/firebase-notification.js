const gcm = require('node-gcm');

module.exports = (function () {
    const sendNotification = (deviceToken, payload) => {
        const message = new gcm.Message({
            notification: {
                title: payload.title,
                body: payload.message,
                sound: 'default',
                vibrate: 'true',
            },
        });

        domain.Log.createChangeLog({
            type: 'firebase_notification',
            newItem: {
                title: payload.title,
                body: payload.message,
                sound: 'default',
                vibrate: 'true',
                deviceToken,
            },
        });

        const sender = new gcm.Sender(process.env.FCM_SERVER_API_KEY);

        return sender.send(message, { registrationTokens: deviceToken }, (error, response) => {
            console.log('Notification Error', error, deviceToken);
            console.log('Notification Response', response);
        });
    };

    return {
        sendNotification,
    };
}());