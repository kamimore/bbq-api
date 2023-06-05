/* eslint-disable no-restricted-syntax */
const BBQ_ERPService = require("../../../controller-service-layer/services/common/BBQ-ERPService");

module.exports = async function (data) {
    const contract = await domain.Contract.findOne({
        where: {
            id: data.id,
        },
        include: [
            {
                model: domain.Vendor,
            },
            {
                model: domain.MstPaymentTerm,
            },
            {
                model: domain.ContractItem,
                include: [
                    {
                        model: domain.MstItem,
                    },
                ],
            },
            {
                model: domain.ContractArea,
                include: [
                    {
                        model: domain.MstArea,
                    },
                ],
            },
        ],
    });

    const items = [];
    if (contract.ContractItems && contract.ContractItems.length) {
        for (const area of contract.ContractAreas) {
            contract.ContractItems.forEach((row) => {
                const object = {
                    contractId: contract.id,
                    ItemNo: row.MstItem.code,
                    VendorNo: contract.Vendor.bbqVendorId,
                    StartDate: contract.fromDate,
                    UOM: row.MstItem.unit,
                    UnitPrice: row.finalPrice,
                    EndDate: contract.toDate,
                    PaymentTerm: contract.MstPaymentTerm
                        ? contract.MstPaymentTerm.code
                        : null,
                    AreaCode: area.MstArea.code,
                };
                items.push(object);
            });
        }
    }

    const result = await BBQ_ERPService.pushContract(items);

    domain.Log.createChangeLog({
        entityId: contract.id,
        type: "create_contract_erp",
        newItem: {
            request: items,
            response: result,
            contractId: contract.id || null,
        },
    });

    if (result && result.Message !== "Inserted")
        throw new Error(result.Message);

    return result;
};
