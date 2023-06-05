const createVendorERP = require('../helpers/create-vendor-erp');

module.exports = async (instance) => {
    // console.log('vendor before update', instance);
    console.log('vendor before update is status changed', instance.changed('status'));

    const vendor = instance.dataValues;

    console.log('vendor status', vendor.status);
    try {
        if (instance.changed('status') && vendor.status === 'approved_by_mdm') {
            console.log('Pushing vendor to ERP');
            await createVendorERP(vendor);
        }

        return Promise.resolve(instance);
    } catch (err) {
        console.log('err', err);
        return Promise.reject(err);
    }
};
