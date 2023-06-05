require('../configurations/init');

const vendorDetails = require('../application/controller-service-layer/services/common/store-vendor-details');

(async function () {
    try {
        await vendorDetails.ImportVendor();
    } catch (error) {
        console.log('Error occured', error);
    }
}());
