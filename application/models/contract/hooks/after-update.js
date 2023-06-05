const sendNotification = require('../helpers/send-notification');
const createApprovalRequest = require('../helpers/create-approval-request');

module.exports = async (instance) => {
    try {
        const contract = instance.dataValues;

        if (contract.type !== 'imported') {
            sendNotification(contract).then(f => f);
        }

        if (contract.status === 'sent_to_co_sourcing' || contract.overrideStatus === 'override') {
            createApprovalRequest(contract).then(f => f);
        }

        return Promise.resolve(instance);
    } catch (err) {
        console.log('err', err);
        return Promise.reject(err);
    }
};
