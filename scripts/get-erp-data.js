require('../configurations/init');

const erpServices = require('../application/controller-service-layer/services/common/BBQ-ERPService');
const updateVendorScript = require('../application/controller-service-layer/services/common/update-external-vendor');

(async function () {
    try {
        await Promise.all([
            // erpServices.importPaymentTerms(),
            // erpServices.importStructure(),
            // erpServices.importSuperCategory(),
            // erpServices.importVendorPostingGroup(),
            // erpServices.importUserList(),
            // erpServices.importAreaCode(),
            // erpServices.importItem(),
            // erpServices.updateVendorData(),
            // erpServices.createOrUpdateUserList(),
            updateVendorScript.updateVendorRegion(),
        ]);

        console.log('Script successfully completed');
        process.exit();
    } catch (err) {
        console.log('Error occurd while calling BBQ API', err);
    }
}());
