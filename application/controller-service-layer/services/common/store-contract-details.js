/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const moment = require('moment');

const CONTRACT_JSON = [];
// const CONTRACT_JSON = require('../../../../docs/contract_new.json');
const {
    uniqBy,
    groupBy,
} = require('lodash');
// const CONTRACT_JSON = [{}];

module.exports = (function () {
    const ImportContract = async () => {

        console.log('Script started');

        const data = await domain.Contract.destroy({
            where: {
                type: 'imported',
            },
            // individualHooks: true,
        });

        console.log('Imported contracts deleted', data);

        const [
            mstArea,
            mstItem,
            vendors,
        ] = await Promise.all([
            domain.MstArea.findAll(),
            domain.MstItem.findAll({
                include: [{
                    model: domain.MstProductGroup,
                    attributes: ['code', 'itemCategoryId'],
                    include: [{
                        model: domain.MstItemCategory,
                        attributes: ['code', 'categoryId'],
                        include: [{
                            model: domain.MstCategory,
                        }],
                    }],
                }],
            }),
            domain.Vendor.findAll(),
        ]);

        console.log('Fetch master tables');
        console.log('Number of vendors', vendors.length);

        const groupedContracts = groupBy(CONTRACT_JSON, c => `${c['Starting Date']}--${c['Ending Date']}--${c['Vendor No_']}--${c['Shortcut Dimension 1 Code']}`);

        console.log('total contract', CONTRACT_JSON.length);
        console.log('Grouped contract', Object.keys(groupedContracts).length);

        for (const key in groupedContracts) {
            console.log('key', key);
            console.log('Number of contacts', groupedContracts[key].length);
            const contracts = groupedContracts[key];
            const initContract = groupedContracts[key][0];

            const vendor = vendors.find(a => a.bbqVendorId == initContract['Vendor No_']);
            const area = mstArea.find(a => a.code == initContract['Shortcut Dimension 1 Code']);
            const uniqItems = uniqBy(contracts, c => [c['Item No_'], c['Unit of Measure Code']].join());
            const itemCategory = mstItem.find(a => a.code == initContract['Item No_']);
            // const uniqItems = uniqBy(contracts, 'Item No_');
            console.log({
                vendorId: vendor && vendor.id,
                itemCategory: itemCategory && itemCategory.id,
                area: area && area.id,
                itemCount: uniqItems.length,
            });

            if (vendor && vendor.id && itemCategory && area && uniqItems && uniqItems.length) {
                const newContract = await domain.Contract.create({
                    vendorId: vendor.id,
                    fromDate: moment(initContract['Starting Date'], ['DD-MM-YYYY']).format('YYYY-MM-DD hh:mm:ss A'),
                    toDate: moment(initContract['Ending Date'], ['DD-MM-YYYY']).format('YYYY-MM-DD hh:mm:ss A'),
                    type: 'imported',
                    categoryId: itemCategory.MstProductGroup.MstItemCategory.MstCategory.id,
                    status: 'approved',
                });

                if (newContract) {
                    const items = [];

                    for (const i of uniqItems) {
                        const item = mstItem.find(a => a.code == i['Item No_'] && a.unit == i['Unit of Measure Code']);

                        if (item) {
                            items.push({
                                contractId: newContract.id,
                                itemId: item.id,
                                itemName: item.name || '',
                                newPrice: i['Direct Unit Cost'],
                                finalPrice: i['Direct Unit Cost'],
                            });
                        }
                    }

                    if (items) {
                        await Promise.all([
                            domain.ContractItem.bulkCreate(items),
                            domain.ContractArea.create({
                                contractId: newContract.id,
                                areaId: area.id,
                            }),
                        ]);
                    }
                }
            }
        }
        console.log('Script completed.');
    };

    return {
        ImportContract,
    };
}());
