/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
const tokenService = require('../common/TokenService');

module.exports = (function () {
    /**
     * {
     *      vendor: {},
     *      phone: XXXX,
     *      email: XXXX
     * }
     */
    const sendLoginLink = async ({
        vendor,
        phone,
        email,
    }, callback) => {
        try {
            const userId = vendor.User.id;
            const user = await domain.User.findOne({
                where: {
                    phone,
                    id: {
                        $ne: userId,
                    },
                },
            });

            if (user) throw new Error('Phone number already registered');

            const userObj = {};

            if (phone) userObj.phone = phone;
            if (email) userObj.email = email;

            await domain.User.update(userObj, {
                where: {
                    id: userId,
                },
            });

            const vendorLocation = await domain.VendorLocation.findOne({
                where: {
                    vendorId: vendor.id,
                },
            });

            if (!vendorLocation) throw new Error('Vendor Location not found');

            await vendorLocation.update({
                phoneNumber : userObj.phone,
                email: userObj.email
            });

            await tokenService.create(
                userId,
                'send_link_to_vendor',
            );

            return callback(null, {
                message: 'Link sent successfully',
            });
        } catch (err) {
            return callback(err);
        }
    };

    const getVendorList = async (data, callback) => {
        try {
            console.log(data.offset, data.limit, 'pagination');

            const query = {
                where: {
                    status: 'approved_by_mdm',
                },
                distinct: true,
                limit: data.limit || 5,
                offset: data.offset || 0,
                required: true,
                attributes: ['id', 'bbqVendorId', 'userId', 'companyName', 'status', 'type'],
                include: [
                    {
                        model: domain.Contract,
                        where: {
                            status: 'approved',
                        },
                        attributes: [],
                        required: !(data.areaIds && data.areaIds.length),
                    },
                    // {
                    //     model: domain.VendorLocation,
                    //     attributes: ['id', 'email', 'contactPersonName', 'phoneNumber', 'gstNumber', 'panNumber'],
                    //     where: {
                    //         isDeleted: false,
                    //     },
                    // },
                    // {
                    //     model: domain.User,
                    //     attributes: ['id'],
                    //     include: [{
                    //             model: domain.UserArea,
                    //             attributes: ['id', 'areaId'],
                    //         },
                    //         {
                    //             model: domain.UserSuperCategory,
                    //             attributes: ['id', 'superCategoryId'],
                    //         },
                    //     ],
                    // },
                ],
            };
            console.log(query.include[2], 'query.include[2]');

            if (data.search) {
                query.where = {
                    status: 'approved_by_mdm',
                    $or: [{
                        bbqVendorId: {
                            $iLike: `%${data.search}%`,
                        },
                    }, {
                        companyName: {
                            $iLike: `%${data.search}%`,
                        },
                    }],
                };
            }

            if (data.areaIds && data.areaIds.length && data.superCategoryId) {
                query.include.push({
                    model: domain.User,
                    attributes: ['id'],
                    required: true,
                    include: [{
                            model: domain.UserArea,
                            where: {
                                areaId: {
                                    $in: data.areaIds,
                                },
                            },
                            // attributes: ['id', 'areaId'],
                            attributes: [],
                        },
                        {
                            model: domain.UserSuperCategory,
                            where: {
                                superCategoryId: data.superCategoryId,
                            },
                            // attributes: ['id', 'superCategoryId'],
                            attributes: [],
                        },
                    ],
                });
                // query.include[2] = {
                //     model: domain.User,
                //     attributes: [],
                //     required: true,
                //     include: [{
                //             model: domain.UserArea,
                //             where: {
                //                 areaId: {
                //                     $in: data.areaIds,
                //                 },
                //             },
                //             // attributes: ['id', 'areaId'],
                //             attributes: [],
                //         },
                //         {
                //             model: domain.UserSuperCategory,
                //             where: {
                //                 superCategoryId: data.superCategoryId,
                //             },
                //             // attributes: ['id', 'superCategoryId'],
                //             attributes: [],
                //         },
                //     ],
                // };
            }

            console.log(query, 'console.log(query.include[2], ');

            const { rows: vendors, count } = await domain.Vendor.findAndCountAll(query);

            // const vendors = [];

            // for (const vendor of rows) {
            //     // eslint-disable-next-line no-await-in-loop
            //     const numberOfContracts = await domain.Contract.count({
            //         where: {
            //             status: 'approved',
            //             vendorId: vendor.id,
            //         },
            //     });

            //     console.log('numberOfContracts', numberOfContracts);

            //     vendor.dataValues.numberOfContracts = numberOfContracts;
            //     vendors.push(vendor);
            // }

            const items = await Promise.all(vendors.map(v => domain.Contract.count({
                where: {
                    status: 'approved',
                    vendorId: v.id,
                },
            })));

            for (const index in items) {
                vendors[index].dataValues.numberOfContracts = items[index];
            }

            console.log('numContracts', items);

            return callback(null, {
                rows: vendors,
                count,
            });
        } catch (error) {
            console.log(error);
            return callback(error);
        }
    };

    return {
        sendLoginLink,
        getVendorList,
    };
}());
