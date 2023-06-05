const pushToERP = require('../helpers/push-to-erp');

module.exports = async (instance) => {
    const contract = instance.dataValues;
    try {
        if (contract.status === 'approved' && contract.contractService !== 'service' && contract.type !== 'imported' && !contract.isContractOverrided) {
            await pushToERP(contract);
        }

        if (contract.overrideStatus === 'override_approved_by_co_sourcing' && !['rejected_by_vendor', 'approved', 'sent_contract_cancel_request', 'contract_cancelled'].includes(contract.status)) {
            await pushToERP(contract);
        }

        const changedValues = instance._changed;

        if (changedValues.hasOwnProperty('overrideStatus') && changedValues.hasOwnProperty('status')) {
            if (contract.status === 'approved' && contract.overrideStatus === 'override_approved_by_co_sourcing') {
                await pushToERP(contract);
            }
        }

        return Promise.resolve(instance);
    } catch (err) {
        console.log('err', err);
        return Promise.reject(err);
    }
};
