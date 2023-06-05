module.exports = async function (instance) {
    try {
        const contract = await domain.Contract.findOne({
            where: {
                id: instance.contractId,
            },
        });

        const message = 'A Contract is assigned to you for approval.';

        if (contract && instance.assignedToId) {
            domain.Notification.createNotification({
                userId: instance.assignedToId,
                type: 'contract_approval_request',
                title: 'Contract approval request',
                message,
                payload: {
                    contractApprovalRequest: instance,
                },
            });
        }
        return Promise.resolve(instance);
    } catch (err) {
        Logger.error(err);
        return Promise.reject(err);
    }
};
