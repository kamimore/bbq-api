require('../configurations/init');

const contractService = require('../application/controller-service-layer/services/common/store-contract-details');

(async function () {
    try {
        await contractService.ImportContract();
    } catch (error) {
        console.log('Error occured', error);
    }
}());
