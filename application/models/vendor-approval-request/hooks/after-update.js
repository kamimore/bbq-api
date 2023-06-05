const { Vendor } = require("../..");
const Logger = require("../../../../utilities/logger-utility");
require('../../../../configurations/init');

module.exports = async function (instance, req) {
    //Logger.info('inside after upadate: instance is :--', instance);
    //Logger.info('inside after upadate: instance status is :--', instance.status);
    console.log('inside after upadate: instance is :--', instance);
    //console.log('inside after upadate: instance status is :--', instance.status);
    const vendor = instance.dataValues;

    console.log('vendor is:---', vendor);
    console.log('vendorassignedToId is:---', vendor.assignedToId);
    try {
        const user1 = await domain.User.findOne({
            attributes: ['id', 'sourcingType'],
            limit: 2000,
            where: {
                // id: '3',
                id: vendor.assignedToId,
                
                
            },
        });
        console.log('user:-----------+++++', user1.dataValues.sourcingType);
 
        const usersIDs = await domain.User.findAll({
            attributes: ['id', 'sourcingType'],
            limit: 2000,
            where: {
                // id: '3',
                sourcingType: user1.dataValues.sourcingType,
                
                
            },
        });
        const UserIds = usersIDs.filter(s => s.sourcingType === user1.dataValues.sourcingType).map(s => s.id);
        console.log('user IDs:------', UserIds);
        
            if (['approved', 'rejected'].includes(instance.status)) {
                await domain.VendorApprovalRequest.destroy({
                    where: {
                        vendorId: instance.vendorId,
                        status: 'pending',
                        superCategoryId: instance.superCategoryId,
                        assignedToId: {
                            [Sequelize.Op.in]: UserIds
                        },
                    },
                });
            }
        

        if (instance.status === 'rejected') {
            const vendor = await domain.Vendor.findOne({
                where: {
                    id: instance.vendorId,
                },
                attributes: ['userId'],
            });

            if (vendor && vendor.userId && instance.superCategoryId) {
                await domain.UserSuperCategory.destroy({
                    where: {
                        userId: vendor.userId,
                        superCategoryId: instance.superCategoryId,
                    },
                });
            }
        }
        return Promise.resolve(instance);
    } catch (error) {
        Logger.error(error);
        return Promise.reject(error);
    }
};
