async function sendNotification(userId, instance) {
    const message = `A new Vendor is registered of ${instance.companyName} company.`;

    domain.Notification.createNotification({
        userId,
        type: 'vendor_registered',
        title: 'Vendor registered',
        message,
        payload: {
            vendor: instance,
        },
    });
}

module.exports = async function (instance) {
    if (instance && instance.type === 'imported') return Promise.resolve(instance);

    const admin = await domain.User.findOne({
        include: [{
            model: domain.Role,
            where: {
                name: 'superadmin',
            },
        }],
    });

    const mdm = await domain.User.findOne({
        include: [{
            model: domain.Role,
            where: {
                name: 'mdm',
            },
        }],
    });

    if (admin) {
        sendNotification(admin.id, instance);
    }
    if (mdm) {
        sendNotification(mdm.id, instance);
    }

    return Promise.resolve(instance);
};
