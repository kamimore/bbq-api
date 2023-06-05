module.exports = async function (instance) {
    try {
        if (['approved', 'rejected'].includes(instance.status)) {
            await domain.ContractApprovalRequest.destroy({
                where: {
                    contractId: instance.contractId,
                    status: 'pending',
                },
            });
        }

        return Promise.resolve(instance);
    } catch (error) {
        Logger.error(error);
        return Promise.reject(error);
    }
};
