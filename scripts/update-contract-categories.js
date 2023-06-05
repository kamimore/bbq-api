require('../configurations/init');

(async function () {
    try {
        const contracts = await domain.Contract.findAll();

        if (contracts && contracts.length) {
            console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
            console.log(`Total contracts found: ${contracts.length}`)
            
            for (const contract of contracts) {
                if (contract.categoryId) {
                    const category = await domain.ContractCategory.create({
                        contractId: contract.id,
                        categoryId: contract.categoryId
                    });

                    if (!category) {
                        console.log(`Contract Category could not created for contract ${contract.id}`)
                    } else {
                        await domain.Contract.update({
                            categoryId: null
                        }, {
                            where: {
                                id: contract.id
                            }
                        });
                        console.log(`Contract ${contract.id} successfully updated`)
                    }
                } else {
                    console.log(`Category not available for contract: ${contract.id} `)
                }
            }
            console.log('Script Completed')
            process.exit();
        } else {
            console.log("No contract found!")
        }
    } catch (error) {
        console.log('Error occured', error);
        process.exit();
    }
}());
