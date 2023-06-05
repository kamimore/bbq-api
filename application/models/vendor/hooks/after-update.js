const createApprovalRequest = require('../helpers/create-approval-request');
// const createVendorERP = require('../helpers/create-vendor-erp');

module.exports = async (instance) => {
    const vendor = instance.dataValues;

    console.log('vendor after update called');

    try {
        if (vendor.status === 'pending') {
            const message = 'Thank you for submiting your details successfully. Our Team will get back to you shortly.';
            const {
                userId,
            } = vendor;

            domain.Notification.createNotification({
                userId,
                type: 'vendor_profile_submitted',
                title: 'Vendor Profile Submited ',
                message,
                payload: {
                    vendor: instance,
                },
            });

            await createApprovalRequest(vendor);
        }
        // else if (vendor.status === 'approved_by_mdm' && vendor.type !== 'imported') {
        //     await createVendorERP(vendor);
        // }

        return Promise.resolve(instance);
    } catch (err) {
        return Promise.reject(err);
    }
};
