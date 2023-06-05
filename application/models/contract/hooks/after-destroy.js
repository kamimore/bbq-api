module.exports = async (instance) => {
    try {
        // const contractId = instance.dataValues.id;

        // Promise.all([
        //     domain.ContractApprovalRequest.destroy({
        //         where: {
        //             contractId,
        //         },
        //     }),
        //     domain.ContractArea.destroy({
        //         where: {
        //             contractId,
        //         },
        //     }),
        //     domain.ContractDocument.destroy({
        //         where: {
        //             contractId,
        //         },
        //     }),
        //     domain.ContractItem.destroy({
        //         where: {
        //             contractId,
        //         },
        //     }),
        //     domain.ContractTemplate.destroy({
        //         where: {
        //             contractId,
        //         },
        //     }),
        // ]).then(f => f);

        // console.log('Deleting all records of contract', contractId);

        return Promise.resolve(instance);
    } catch (err) {
        console.log('err', err);
        return Promise.reject(err);
    }
};
