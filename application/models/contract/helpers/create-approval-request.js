const {
    uniq,
} = require('lodash');

const getCoorporateUsers = async (regionIds, superCategoryId, contractId) => {
    try {
        const coorporateUsers = await domain.User.findAll({
            where: {
                sourcingType: 'coorporate_sourcing',
            },
            include: [{
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
        });

        if (coorporateUsers && coorporateUsers.length) {
            const contractApprovalRequest = coorporateUsers.map(u => ({
                assignedToId: u.id,
                contractId,
            }));

            for (const req of contractApprovalRequest) {
                await domain.ContractApprovalRequest.create(req);
            }
        } else console.log(`No Coorporate user found for ${regionIds}, and ${superCategoryId}`);
    } catch (error) {
        console.log('Something went wrong while getting coorporate users');
        console.log(error);
    }
};

module.exports = async function (data) {
    try {
        const contract = await domain.Contract.findOne({
            where: {
                id: data.id,
            },
            attributes: ['id'],
            include: [{
                model: domain.ContractCategory,
                include: [{
                    model: domain.MstCategory,
                    include: [{
                        model: domain.MstSuperCategory,
                    }],
                }],
            }, {
                model: domain.ContractArea,
                include: [{
                    model: domain.MstArea,
                    include: [{
                        model: domain.MstRegion,
                    }],
                }],
            }, {
                model: domain.User,
            }],
        });


        if (contract && contract.User) {
            if (contract.User.sourcingType === 'sourcing') {
                const regionIds = uniq(contract.ContractAreas.map(v => v.MstArea.regionId));
                console.log(regionIds, 'regionIds');

                let superCategoryId = null;
                if(contract.ContractCategories && contract.ContractCategories.length) {
                    superCategoryId = contract.ContractCategories[0].MstCategory.MstSuperCategory.id
                }

                await getCoorporateUsers(regionIds, superCategoryId, contract.id);
            }
        }
    } catch (error) {
        console.log(error);
    }
};
