const sendNotification = require('../helpers/send-notification');

module.exports = async (instance) => {
    try {
        const contract = instance.dataValues;

        if (contract.status === 'sent_to_vendor') {
            sendNotification(contract).then(f => f);
        }

        return Promise.resolve(instance);
    } catch (err) {
        return Promise.reject(err);
    }
};
