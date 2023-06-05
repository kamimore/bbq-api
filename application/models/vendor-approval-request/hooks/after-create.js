module.exports = async function (instance) {
    try {
        const vendor = await domain.User.findOne({
            where: {
                id: instance.vendorId,
            },
        });

        console.log('------------instance-----', instance.assignedToId);

        const message = 'A Vendor is assigned to you for approval.';

        if (vendor && instance.assignedToId) {
            domain.Notification.createNotification({
                userId: instance.assignedToId,
                type: 'vendor_approval_request',
                title: 'Vendor approval request',
                message,
                payload: {
                    vendorApprovalRequest: instance,
                },
            });
        }
        return Promise.resolve(instance);
    } catch (err) {
        Logger.error(err);
        return Promise.reject(err);
    }
};
