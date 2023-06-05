const {
    uniq,
} = require('lodash');

module.exports = (function () {
    const updateVendorRegion = async () => {
        try {
            const mstArea = await domain.MstArea.findAll();

            const vendors = await domain.Vendor.findAll({
                where: {
                    type: {
                        $ne: 'imported',
                    },
                },
                attributes: ['id', 'userId', 'type'],
                include: [{
                    model: domain.User,
                    attributes: ['id'],
                    include: [{
                        model: domain.UserArea,
                        attributes: ['areaId'],
                        include: [{
                            model: domain.MstArea,
                            attributes: ['regionId'],
                        }],
                    }],
                }],
            });

            for (const vendor of vendors) {
                await domain.UserRegion.destroy({
                    where: {
                        userId: vendor.userId,
                    },
                });

                const areaIds = vendor.User.UserAreas.map(a => a.areaId);

                let regions = [];

                for (const areaId of areaIds) {
                    const vendorArea = mstArea.find(a => a.id === areaId);

                    if (vendorArea && vendorArea.regionId) {
                        regions.push(vendorArea.regionId);
                    } else {
                        console.log('No region found for ', areaId);
                    }
                }

                regions = uniq(regions);

                if (regions && regions.length) {
                    await domain.UserRegion.bulkCreate(regions.map(region => ({
                        regionId: region,
                        userId: vendor.userId,
                    })));
                }
                console.log('Region successfully saved for ', vendor.userId, vendor.type);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return {
        updateVendorRegion,
    };
}());
