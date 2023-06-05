/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const {
    uniq,
} = require('lodash');

function assignRequest(vendorId, assignedToId = null, superCategoryId = null) {
    console.log({
        vendorId,
        assignedToId,
        superCategoryId,
    });

    return domain.VendorApprovalRequest.create({
        vendorId,
        assignedToId,
        superCategoryId,
    });
}

async function sendRequestToCoSourcing(vendorId, superCategoryId, regionIds) {
    console.log('No Regional user found, sending to all Coorporate Sourcing user!');

    const query = {
        where: {
            sourcingType: 'coorporate_sourcing',
        },
        attributes: ['id'],
        include: [{
            model: domain.Role,
            where: {
                name: 'sourcing',
            },
        }, {
            model: domain.UserRegion,
            where: {
                regionId: {
                    $in: regionIds,
                },
            },
        }, {
            model: domain.UserSuperCategory,
            where: {
                superCategoryId,
            },
        }],
    };

    const users = await domain.User.findAll(query);

    console.log(`Co sourcing user count : ${users.length}, SuperCategory : ${superCategoryId}`);

    if (users && users.length) {
        for (const user of users) {
            assignRequest(vendorId, user.id, superCategoryId).then(f => f);
        }
    }
}

async function getSourcingUser(regionIds, superCategoryIds, vendor) {
    const sourcingType = (regionIds && regionIds.length > 1) ? 'coorporate_sourcing' : 'sourcing';

    for (const superCategoryId of superCategoryIds) {
        const query = {
            where: {
                sourcingType: 'coorporate_sourcing',
            },
            attributes: ['id'],
            include: [{
                model: domain.Role,
                where: {
                    name: 'sourcing',
                },
            }, {
                model: domain.UserRegion,
                where: {
                    regionId: {
                        $in: regionIds,
                    },
                },
            }, {
                model: domain.UserSuperCategory,
                where: {
                    superCategoryId,
                },
            }],
        };

        query.where.sourcingType = sourcingType;

        console.log('query', query);

        const users = await domain.User.findAll(query);

        console.log(`sourcingType: ${sourcingType}, Users count : ${users.length}, SuperCategory : ${superCategoryId}`);

        if (users && users.length) {
            for (const user of users) {
                assignRequest(vendor.id, user.id, superCategoryId).then(f => f);
            }
        } else if (sourcingType === 'sourcing') {
            console.log(`No regional sourcing found for ${superCategoryId} in ${regionIds} so, Assigning request co. sourcing`);

            sendRequestToCoSourcing(vendor.id, superCategoryId, regionIds).then(f => f);
        }
    }
}

// async function assignToSourcingHead(vendor) {
//     const sourcing_heads = await domain.User.findAll({
//         where: {
//             sourcingType: 'sourcing_head',
//         },
//         attributes: ['id'],
//         include: [{
//             model: domain.Role,
//             where: {
//                 name: 'sourcing',
//             },
//         }],
//     });

//     if (sourcing_heads && sourcing_heads.length) {
//         for (const sourcing_head of sourcing_heads) {
//             assignRequest(vendor.id, sourcing_head.id).then(f => f);
//         }
//     } else {
//         console.log('No Sourcing Head found');
//     }
// }
// added by rudresh..
async function assignToSourcingHead(superCategoryIds, vendor) {
    for (const superCategoryId of superCategoryIds) {
    const sourcing_heads = await domain.User.findAll({
            where: {
                sourcingType: 'sourcing_head',
            },
            attributes: ['id'],
            include: [{
                model: domain.Role,
                where: {
                    name: 'sourcing',
                },
            }, {
                    model: domain.UserSuperCategory,
                    where: {
                        superCategoryId,
                    },
                }],
        });

        if (sourcing_heads && sourcing_heads.length) {
            for (const sourcing_head of sourcing_heads) {
                assignRequest(vendor.id, sourcing_head.id, superCategoryId).then(f => f);
            }
        } else {
            console.log('No Sourcing Head found');
        }
    }
}


async function assignToMDM(vendor) {
    const mdms = await domain.User.findAll({
        where: {
            sourcingType: 'mdm',
        },
        attributes: ['id'],
        include: [{
            model: domain.Role,
            where: {
                name: 'sourcing',
            },
        }],
    });

    if (mdms && mdms.length) {
        for (const mdm of mdms) {
            assignRequest(vendor.id, mdm.id).then(f => f);
        }
    } else {
        console.log('No MDM found');
    }
}

async function getVendorDetail(vendor) {
    const vendorUser = await domain.User.findOne({
        where: {
            id: vendor.userId,
        },
        include: [{
            model: domain.UserArea,
            include: [{
                model: domain.MstArea,
            }],
        }, {
            model: domain.UserSuperCategory,
        }],
    });

    let vendorAreas = [];
    let vendorSupercategories = [];

    if (vendorUser) {
        vendorAreas = vendorUser.UserAreas;
        vendorSupercategories = vendorUser.UserSuperCategories;
    }

    const regionIds = uniq(vendorAreas.map(v => v.MstArea.regionId));

    console.log('regionIds', regionIds);

    const superCategoryIds = uniq(vendorSupercategories.map(x => x.superCategoryId));

    console.log('superCategoryIds', superCategoryIds);

    if (regionIds && !regionIds.length) console.log('No region found for vendor');

    if (superCategoryIds && !superCategoryIds.length) console.log('No supercategory found for vendor');

    return {
        regionIds,
        superCategoryIds,
    };
}

/**
 * Delete all pending requests
 * Find vendor regions and supercategories
 * If multiple regions, assign approval request to coorporate sourcing users
 * else assign to sourcing user based on region
 * Finally, assign to MDM
 */
module.exports = async function (vendor) {
    console.log(`Assigning user for vendor approval : ${vendor.id}`);

    await domain.VendorApprovalRequest.destroy({
        where: {
            vendorId: vendor.id,
            status: 'pending',
        },
    });

    const {
        regionIds,
        superCategoryIds,
    } = await getVendorDetail(vendor);


    if (regionIds && regionIds.length) {
        await getSourcingUser(regionIds, superCategoryIds, vendor);
    }
    // if(superCategoryIds && superCategoryIds.length){
    //     await assignToSourcingHead(superCategoryIds, vendor);
    // }
    await assignToSourcingHead(superCategoryIds, vendor);
    await assignToMDM(vendor);
};
