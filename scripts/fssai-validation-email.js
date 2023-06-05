require('../configurations/init');
const moment = require("moment");
const { fssaiValidTill } = require("../application/models/vendor-location/fields");
const configHolder = require("../configurations/init");

(async function () {
    try {
        const vendorLocations = await domain.VendorLocation.findAll({
            where: {
                fssaiNumber: {
                    $ne: null
                }
            },
            include: [
                {
                    model: domain.Vendor,
                    attributes: ["companyName", "bbqVendorId"],
                }
            ]
        });
        const users = await domain.User.findAll({
            where: {
                $or: [{
                    sourcingType: 'coorporate_sourcing',
                }, {
                    sourcingType: 'mdm',
                }]
            },
        });

        let expiryData = [];

        for (const location of vendorLocations) {
            if (location.fssaiNumber && !location.fssaiValidTill) {
                // console.log(`Location ${location.id} does not have validity date!`);
            } else {
                if (location.fssaiValidTill) {
                    const currentDate = moment();
                    const validityDate = moment(location.fssaiValidTill);

                    const difference = validityDate.diff(currentDate, 'day');

                    if (difference === 7 || difference === 15 || difference === 30) {
                        expiryData.push({
                            companyName: location.Vendor.companyName,
                            date: location.fssaiValidTill,
                            fssaiNumber: location.fssaiNumber,
                            days: difference,
                            phone: location.phoneNumber,
                            vendorCode: location.Vendor.bbqVendorId
                        });
                    }
                }
            }
        }
        console.log("Total length ",expiryData.length)

        if(expiryData.length) {
            for (const user of users) {
                for (const mail of expiryData) {
                    await configHolder.emailUtil.sendEmail('html', user.email, "Fssai Licience about to expire", null, 'fssai-validity-alert', { ...mail, name: user.fullName });
                    console.log(`Email sent to ${user.fullName}`)
                }
            }
        } else {
            console.log("No fssai certificate is about to expire")
        }

    } catch (error) {
        console.log('Error occured during cron', error);
    }
}());
