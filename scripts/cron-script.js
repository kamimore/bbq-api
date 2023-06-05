const cron = require('node-cron');
require('../configurations/init');

const erpServices = require('../application/controller-service-layer/services/common/BBQ-ERPService');

cron.schedule('0 0 0 * * *', async () => {
    try {
        configHolder.emailUtil.sendEmail('html', process.env.ADMIN_NOTIFY_EMAIL, 'VCM Cron Started', null, 'common', {
            name: 'Admin',
            message: 'VCM Cron started',
        });

        await Promise.all([
            erpServices.importPaymentTerms(),
            erpServices.importStructure(),
            erpServices.importSuperCategory(),
            erpServices.importVendorPostingGroup(),
            erpServices.importUserList(),
            erpServices.importAreaCode(),
            erpServices.importItem(),
        ]);

        console.log('Script successfully completed');

        configHolder.emailUtil.sendEmail('html', process.env.ADMIN_NOTIFY_EMAIL, 'VCM Cron Completed successfully', null, 'common', {
            name: 'Admin',
            message: 'VCM Cron Completed successfully',
        });
    } catch (err) {
        console.log('Error occurd while calling BBQ API', err);

        configHolder.emailUtil.sendEmail('html', process.env.ADMIN_NOTIFY_EMAIL, 'VCM Cron not completed', null, 'common', {
            name: 'Admin',
            message: err,
        });
    }
});
