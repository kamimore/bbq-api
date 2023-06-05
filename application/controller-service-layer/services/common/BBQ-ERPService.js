/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const MST_BASE_URL = process.env.BBQ_API_HOST_2;
const USER_STORE_URL = process.env.BBQ_API_HOST_1;
const { uniq } = require("lodash");

module.exports = (function () {
    const importPaymentTerms = async () => {
        try {
            const parsedData = await configHolder.requestUtility(
                "GET",
                `${MST_BASE_URL}/PaymentTerm`,
                ""
            );
            const { PaymentTerms } = parsedData;

            for (const val of PaymentTerms) {
                const payment = await domain.MstPaymentTerm.findOne({
                    where: {
                        code: val.Code,
                    },
                });
                if (payment) {
                    // console.log(payment.dataValues.code)
                    await domain.MstPaymentTerm.update(
                        {
                            name: val.Description,
                        },
                        {
                            where: {
                                code: val.Code,
                            },
                        }
                    );
                    console.log(
                        `MstPaymentTerm code - ${val.Code} successfully updated`
                    );
                } else {
                    await domain.MstPaymentTerm.create({
                        code: val.Code,
                        name: val.Description,
                    });
                    console.log(
                        `MstPaymentTerm code - ${val.Code} successfully created`
                    );
                }
            }
            console.log("-----------------importPaymentTerms done------------");
        } catch (err) {
            console.log(err);
        }
    };

    const importSuperCategory = async () => {
        try {
            const parsedData = await configHolder.requestUtility(
                "GET",
                `${MST_BASE_URL}/supercategory`,
                ""
            );
            const SuperCategory = parsedData.SuperCategories;

            let superCategories = SuperCategory.map((s) => s.SuperCategory);

            superCategories = uniq(superCategories);

            for (const superCat of superCategories) {
                const superCatObj = await domain.MstSuperCategory.findOne({
                    where: {
                        name: superCat,
                    },
                });

                if (superCatObj) {
                    await domain.MstSuperCategory.update(
                        {
                            name: superCat,
                        },
                        {
                            where: {
                                name: superCat,
                            },
                        }
                    );
                    console.log(
                        `MStSuperCategory name ${superCat} successfully updated`
                    );
                } else {
                    await domain.MstSuperCategory.create({
                        name: superCat,
                    });
                    console.log(
                        `MStSuperCategory name ${superCat} successfully created`
                    );
                }
            }

            for (const val of SuperCategory) {
                const superCatObj = await domain.MstSuperCategory.findOne({
                    where: {
                        name: val.SuperCategory,
                    },
                });

                const catObj = await domain.MstCategory.findOne({
                    where: {
                        code: val.Code,
                    },
                });

                if (catObj) {
                    await domain.MstCategory.update(
                        {
                            name: val.Description,
                        },
                        {
                            where: {
                                code: val.Code,
                            },
                        }
                    );
                    console.log(
                        `MstCategory code ${val.Code} successfully updated`
                    );
                } else {
                    await domain.MstCategory.create({
                        code: val.Code,
                        name: val.Description,
                        superCategoryId: superCatObj.id,
                    });
                    console.log(
                        `MstCategory code ${val.Code} successfully created`
                    );
                }
            }
            console.log("-----importSuperCategory done-----");
        } catch (err) {
            console.log(err);
        }
    };

    const importStructure = async () => {
        try {
            const parsedData = await configHolder.requestUtility(
                "GET",
                `${MST_BASE_URL}/Structure`,
                ""
            );
            const structure = parsedData.structures;

            for (const val of structure) {
                const struct = await domain.MstStructure.findOne({
                    where: {
                        code: val.Code,
                    },
                });
                if (struct) {
                    await domain.MstStructure.update(
                        {
                            code: val.Code,
                        },
                        {
                            where: {
                                code: val.Code,
                            },
                        }
                    );
                    console.log(
                        `MstStructure ${val.Code} successfully updated`
                    );
                } else {
                    await domain.MstStructure.create({
                        code: val.Code,
                    });
                }
                console.log(`MstStructure ${val.Code} successfully created`);
            }
            console.log("importStructure done");
        } catch (err) {
            console.log(err);
        }
    };

    const importAreaCode = async () => {
        try {
            const parsedData = await configHolder.requestUtility(
                "GET",
                `${MST_BASE_URL}/AreaCode`,
                ""
            );
            const areas = parsedData.AreaCodes;

            // Getting unique regions
            const uniqueRegions = areas.filter(
                (region, index) =>
                    index ===
                    areas.findIndex(
                        (obj) =>
                            JSON.stringify(obj.Region) ===
                            JSON.stringify(region.Region)
                    )
            );

            // Getting unique states
            const uniqueStates = areas.filter(
                (state, index) =>
                    index ===
                    areas.findIndex(
                        (obj) =>
                            JSON.stringify(obj.StateCode) ===
                            JSON.stringify(state.StateCode)
                    )
            );

            // Getting unique cities
            const uniqueCities = areas.filter(
                (city, index) =>
                    index ===
                    areas.findIndex((obj) => {
                        if (obj.City) {
                            return (
                                JSON.stringify(obj.City) ===
                                JSON.stringify(city.City)
                            );
                        }
                    })
            );

            // Inserting regions
            for (const region of uniqueRegions) {
                const regionObj = await domain.MstRegion.findOne({
                    where: {
                        name: region.Region,
                    },
                });

                if (!regionObj) {
                    await domain.MstRegion.create({
                        name: region.Region,
                    });
                    console.log(`Created MstRegion name ${region.Region}`);
                } else {
                    await domain.MstRegion.update(
                        {
                            name: region.Region,
                        },
                        {
                            where: {
                                id: regionObj.id,
                            },
                        }
                    );
                    console.log(`Updated MstRegion name ${region.Region}`);
                }
            }

            // Inserting states
            for (const state of uniqueStates) {
                const stateObj = await domain.MstState.findOne({
                    where: {
                        name: state.StateCode,
                    },
                });
                if (!stateObj) {
                    await domain.MstState.create({
                        code: state.StateCode,
                        name: state.State,
                    });
                    console.log(`created MstState code - ${state.StateCode}`);
                } else {
                    await domain.MstState.update(
                        {
                            code: state.StateCode,
                            name: state.State,
                        },
                        {
                            where: {
                                id: stateObj.id,
                            },
                        }
                    );
                    console.log(`Updated MstState code - ${state.StateCode}`);
                }
            }

            // Inserting cities
            for (const city of uniqueCities) {
                const stateObj = await domain.MstState.findOne({
                    where: {
                        code: city.StateCode,
                    },
                });

                if (stateObj) {
                    const cityObj = await domain.MstCity.findOne({
                        where: {
                            name: city.City,
                        },
                    });
                    if (!cityObj) {
                        await domain.MstCity.create({
                            name: city.City,
                            stateId: stateObj.id,
                        });
                        console.log(`created MstCity name - ${city.City}`);
                    } else {
                        await domain.MstCity.update(
                            {
                                name: city.City,
                                stateId: stateObj.id,
                            },
                            {
                                where: {
                                    id: cityObj.id,
                                },
                            }
                        );
                        console.log(`Updated MstCity name - ${city.City}`);
                    }
                }
            }

            // Inserting Areas
            for (const area of areas) {
                const regionObj = await domain.MstRegion.findOne({
                    where: {
                        name: area.Region,
                    },
                });

                const stateObj = await domain.MstState.findOne({
                    where: {
                        code: area.StateCode,
                    },
                });

                const cityObj = await domain.MstCity.findOne({
                    where: {
                        name: area.City,
                    },
                });

                if (regionObj && stateObj && cityObj) {
                    const areaObj = await domain.MstArea.findOne({
                        where: {
                            code: area.Code,
                        },
                    });
                    if (!areaObj) {
                        await domain.MstArea.create({
                            code: area.Code,
                            name: area.Name,
                            regionId: regionObj.id,
                            stateId: stateObj.id,
                            cityId: cityObj.id,
                            address1: area.Address1,
                            address2: area.Address2,
                            postCode: area.PostCode,
                        });
                        console.log(
                            `Created MstArea code, postCode  ${area.Code}, ${area.PostCode}`
                        );

                        // inserting address in MstArea
                    } else {
                        await domain.MstArea.update(
                            {
                                // code: area.Code,
                                name: area.Name,
                                // regionId: regionObj.id,
                                stateId: stateObj.id,
                                cityId: cityObj.id,
                                address1: area.Address1,
                                address2: area.Address2,
                                postCode: area.PostCode,
                            },
                            {
                                where: {
                                    id: areaObj.id,
                                },
                            }
                        );

                        console.log(
                            `Updated MstArea code, postCode  ${area.Code}, ${area.PostCode}`
                        );
                    }
                }
            }
            console.log("------------importAreaCode done -----------------");
        } catch (error) {
            console.log(error);
        }
    };

    const importVendorPostingGroup = async () => {
        const parsedData = await configHolder.requestUtility(
            "GET",
            `${MST_BASE_URL}/VendorPostingGroup`,
            ""
        );
        const VPG = parsedData.VendorPostingGroups;

        for (const val of VPG) {
            try {
                const vendorPostingGroup = await domain.MstVendorPostingGroup.findOne(
                    {
                        where: {
                            code: val.Code,
                        },
                    }
                );
                if (vendorPostingGroup) {
                    await domain.MstVendorPostingGroup.update(
                        {
                            code: val.Code,
                        },
                        {
                            where: {
                                code: val.Code,
                            },
                        }
                    );
                    console.log(
                        `MstVendorPostingGroup code ${val.Code} successfully updated`
                    );
                } else {
                    await domain.MstVendorPostingGroup.create({
                        code: val.Code,
                    });
                    console.log(
                        `MstVendorPostingGroup code ${val.Code} successfully created`
                    );
                }
            } catch (err) {
                console.log(err);
            }
        }
        console.log(
            "-----------------importVendorPostingGroup done----------------"
        );
    };

    const importUserList = async () => {
        console.log("running ~~~~ importUserList");
        const parsedData = await configHolder.requestUtility(
            "POST",
            `${USER_STORE_URL}/UsersList`,
            ""
        );
        const users = parsedData.UsersList;

        console.log("number of users", users.length);
        if (users.length) {
            let str = "array[";
            users.forEach((el) => {
                str += `row('${el.Empcd.replace(
                    new RegExp("'", "g"),
                    '"'
                ).trim()}','${el.Name.replace(
                    new RegExp("'", "g"),
                    '"'
                ).trim()}', '${el.UserName.replace(
                    new RegExp("'", "g"),
                    '"'
                ).trim()}', '${el.Phone.replace(
                    new RegExp("'", "g"),
                    '"'
                ).trim()}', 0),`;
            });
            str = str.slice(0, -1);
            str += "]::user_insertion_type[]";
            const data = await SequelizeConnect.query(
                `CALL usp_user_create(${str});`
            );
        }
        console.log("----------importUserList Done----");
    };

    const createOrUpdateUserList = async () => {
        const parsedData = await configHolder.requestUtility(
            "POST",
            `${USER_STORE_URL}/UsersList`,
            ""
        );
        const users = parsedData.UsersList;
        console.log("number of users", users.length);
        let count = 0;

        for (const val of users) {
            try {
                const user = await domain.User.findOne({
                    where: {
                        userName: val.UserName,
                    },
                });

                let updatedUser;

                if (user) {
                    updatedUser = await domain.User.update(
                        {
                            fullName: val.Name,
                            username: val.UserName,
                            phone: val.Phone,
                            email: val.Email,
                        },
                        {
                            where: {
                                userName: val.UserName,
                            },
                        }
                    );
                } else {
                    updatedUser = await domain.User.create({
                        employeeCode: val.Empcd,
                        fullName: val.Name,
                        userName: val.UserName,
                        phone: val.Phone,
                        email: val.Email,
                    });
                }

                console.log(++count, "as");

                if (!updatedUser)
                    console.log(
                        `Something went wrong while creating/Updating USER ${val.Name} - ${val.Empcd}`
                    );

                console.log(`USER ${val.Name} successfully Updated`);
            } catch (error) {
                console.log(error);
            }
        }

        console.log(`User successfull updated ${users.length}`);
        console.log("----createOrUpdateUserList done---------");
    };

    const renderItemRow = function (el) {
        return `row(
            '${
                el.BaseUnitOfMeasure.replace(
                    new RegExp("'", "g"),
                    '"'
                ).trim() || ""
            }',
            '${el.Category.replace(new RegExp("'", "g"), '"').trim() || ""}',
            '${el.Code.replace(new RegExp("'", "g"), '"').trim() || ""}',
            '${el.Description.replace(new RegExp("'", "g"), '"').trim() || ""}',
            '${el.Division.replace(new RegExp("'", "g"), '"').trim() || ""}',
            '${
                el.DivisionCode.replace(new RegExp("'", "g"), '"').trim() || ""
            }',
            '${
                el.ItemCategoryCode.replace(new RegExp("'", "g"), '"').trim() ||
                ""
            }',
            '${el.ItemName.replace(new RegExp("'", "g"), '"').trim() || ""}',
            '${el.ItemNo.replace(new RegExp("'", "g"), '"').trim() || ""}',
            '${
                el.SuperCategory.replace(new RegExp("'", "g"), '"').trim() || ""
            }',
            ${el.tax || 0}
        ),`;
    };

    const importItem = async () => {
        const mstCategory = await domain.MstCategory.findAll();
        // Inserting regions
        // eslint-disable-next-line no-restricted-syntax
        for (const cat of mstCategory) {
            // eslint-disable-next-line no-await-in-loop
            const parsedData = await configHolder.requestUtility(
                "GET",
                `${MST_BASE_URL}/ProductCatagory${cat.code}`,
                ""
            );

            const items = parsedData.ProductCatagories;

            if (items && items.length) {
                console.log(items.length);
                // Getting unique item category
                const uniqueItemCategory = [];
                const uniqueProductGroup = [];

                items.forEach((el) => {
                    const isCategoryExist = uniqueItemCategory.find(
                        (x) => x.ItemCategoryCode === el.ItemCategoryCode
                    );
                    const isProductGrpExist = uniqueItemCategory.find(
                        (x) => x.Code === el.Code
                    );
                    if (!isCategoryExist) {
                        uniqueItemCategory.push(el);
                    }
                    if (!isProductGrpExist) {
                        uniqueProductGroup.push(el);
                    }
                });
                console.log(`For Code ${cat.code},
                            Total Rows: ${items.length},
                            Unique Item Category ${uniqueItemCategory.length},
                            Unique Product Group ${uniqueProductGroup.length}`);

                let allItemsStr = "array[";
                let uniqueItemCategoryStr = "array[";
                let uniqueProductGroupStr = "array[";

                // eslint-disable-next-line no-loop-func
                items.forEach((el) => {
                    el.ItemGroupUOM.forEach((row) => {
                        const itemObj = {
                            BaseUnitOfMeasure: row.UOMCode,
                            Category: el.Category,
                            Code: el.Code,
                            Description: el.Description,
                            Division: el.Division,
                            DivisionCode: el.DivisionCode,
                            ItemCategoryCode: el.ItemCategoryCode,
                            ItemName: el.ItemName,
                            ItemNo: el.ItemNo,
                            SuperCategory: el.SuperCategory,
                            tax: parseFloat(el.GST_Perc),
                        };
                        allItemsStr += renderItemRow(itemObj);
                    });
                });
                allItemsStr = allItemsStr.slice(0, -1);
                allItemsStr += "]::category_item_type[]";

                // eslint-disable-next-line no-loop-func
                uniqueItemCategory.forEach((el) => {
                    uniqueItemCategoryStr += renderItemRow(el);
                });
                uniqueItemCategoryStr = uniqueItemCategoryStr.slice(0, -1);
                uniqueItemCategoryStr += "]::category_item_type[]";

                // eslint-disable-next-line no-loop-func
                uniqueProductGroup.forEach((el) => {
                    uniqueProductGroupStr += renderItemRow(el);
                });
                uniqueProductGroupStr = uniqueProductGroupStr.slice(0, -1);
                uniqueProductGroupStr += "]::category_item_type[]";
                // console.log(allItemsStr, 'allItemsStrallItemsStrallItemsStrallItemsStrallItemsStr');
                // eslint-disable-next-line no-await-in-loop
                const data = await SequelizeConnect.query(
                    `CALL usp_import_item(${allItemsStr}, ${uniqueItemCategoryStr}, ${uniqueProductGroupStr});`
                );
                // console.log('Done', data);
            }
        }

        console.log("------importItem done------");
    };

    const createVendor = async (payload) => {
        const data = await configHolder.requestUtility(
            "POST",
            `${MST_BASE_URL}/Vendor`,
            payload
        );
        console.log("ERP url", MST_BASE_URL);
        console.log("ERP Vendor Api Done", data);
        return data;
    };

    const pushContract = async (payload) => {
        const data = await configHolder.requestUtility(
            "POST",
            `${MST_BASE_URL}/InsertPurchPriceMultipleBBQN`,
            {
                InsertPurchPriceMultipleRequestBBQNList: payload,
            }
        );
        console.log("ERP url", MST_BASE_URL);
        console.log("ERP Contract Api Done", data);
        return data;
    };

    const updateVendorData = async () => {
        try {
            const vendors = await domain.Vendor.findAll({
                where: {
                    type: "imported",
                    // id: 904,
                },
                include: [
                    {
                        model: domain.User,
                    },
                ],
            });

            const [
                mstCity,
                mstState,
                mstArea,
                mstStructure,
                mstPaymentTerm,
                mstSuperCategory,
            ] = await Promise.all([
                domain.MstCity.findAll(),
                domain.MstState.findAll(),
                domain.MstArea.findAll(),
                domain.MstStructure.findAll(),
                domain.MstPaymentTerm.findAll(),
                domain.MstSuperCategory.findAll(),
            ]);
            console.log(vendors.length, "total imported vendor");

            for (const vendor of vendors) {
                const updatedVendorDetail = await configHolder.requestUtility(
                    "GET",
                    `${MST_BASE_URL}/VendorList/${vendor.bbqVendorId}`
                );

                const vendorId = vendor.id;
                const structure = mstStructure.find(
                    (a) => a.code === updatedVendorDetail.Structure
                );
                let structureId;
                if (structure) {
                    structureId = structure.id;
                } else console.log("Structrure not found");

                const paymentTerm = mstPaymentTerm.find(
                    (a) => a.code === updatedVendorDetail.Payment_Terms_code
                );
                let paymentTermId;
                if (paymentTerm) paymentTermId = paymentTerm.id;
                else console.log("Payment term doesnot exist");

                const foodId =
                    updatedVendorDetail.Food == 1
                        ? mstSuperCategory.find((a) => a.name === "Food").id
                        : null;
                const nonFoodId =
                    updatedVendorDetail.NonFood == 1
                        ? mstSuperCategory.find((a) => a.name === "NonFood").id
                        : null;
                const beverageId =
                    updatedVendorDetail.Beverage == "True"
                        ? mstSuperCategory.find((a) => a.name === "Beverage").id
                        : null;

                const superCategories = [];

                if (foodId) superCategories.push(foodId);
                if (nonFoodId) superCategories.push(nonFoodId);
                if (beverageId) superCategories.push(beverageId);

                await Promise.all([
                    domain.VendorLocation.destroy({
                        where: {
                            vendorId,
                        },
                    }),
                    domain.UserArea.destroy({
                        where: {
                            userId: vendor.User.id,
                        },
                    }),
                    domain.UserSuperCategory.destroy({
                        where: {
                            userId: vendor.User.id,
                        },
                    }),
                    domain.UserRegion.destroy({
                        where: {
                            userId: vendor.User.id,
                        },
                    }),
                ]);

                await domain.Vendor.update(
                    {
                        companyName: updatedVendorDetail.Name,
                        generalBusPostingGroup: "main_store",
                        vatBusPostingGroup: updatedVendorDetail.vATBusPostGrp
                            ? updatedVendorDetail.vATBusPostGrp.toLowerCase()
                            : "vat",
                        vatRegisterationNumber: updatedVendorDetail.vATRegNo,
                        structureId,
                        paymentTermId,
                    },
                    {
                        where: {
                            id: vendorId,
                        },
                    }
                );

                for (const superCategoryId of superCategories) {
                    await domain.UserSuperCategory.create({
                        userId: vendor.User.id,
                        superCategoryId,
                    });
                }

                const vendorLocations = [];
                if (
                    updatedVendorDetail &&
                    updatedVendorDetail.InsertModifyVendorAddress.length
                ) {
                    for (const a of updatedVendorDetail.InsertModifyVendorAddress) {
                        const city = mstCity.find(
                            (m) => m.name === a.orderCity
                        );
                        let stateId;
                        if (city && city.stateId) {
                            const state = mstState.find(
                                (m) => m.id === city.stateId
                            );
                            if (state) {
                                stateId = state.id;
                            } else {
                                console.log("State not found.");
                            }
                        } else {
                            console.log("City not found");
                        }
                        const gstVendorType =
                            a.GST_Vendor_Type == 0
                                ? "not_registered"
                                : "registered";

                        const result = await domain.VendorLocation.create({
                            address: a.address,
                            address2: a.address2,
                            city: a.orderCity,
                            country: a.coutryRegion,
                            email: a.email,
                            gstNumber: a.gSTRegistrationNo,
                            phoneNumber: a.mobileNo,
                            contactPersonName: updatedVendorDetail.Contact,
                            postCode: a.postCode,
                            companyName: a.vendorName,
                            stateId,
                            vendorId,
                            gstVendorType,
                            panNumber: updatedVendorDetail.PAN_NO,
                            isPANAvailable:
                                updatedVendorDetail.Pan_Holder_Status != 0,
                            tinNumber: updatedVendorDetail.TIN_No,
                            taxLiable: updatedVendorDetail.Tax_Liable != 0,
                        });

                        console.log("vendor inner location");
                        vendorLocations.push(result);
                    }
                } else {
                    const city = mstCity.find(
                        (m) => m.name === updatedVendorDetail.City
                    );
                    let stateId;
                    if (city && city.stateId) {
                        const state = mstState.find(
                            (m) => m.id === city.stateId
                        );
                        if (state) {
                            stateId = state.id;
                        } else {
                            console.log("State not found.");
                        }
                    } else {
                        console.log("City not found");
                    }

                    const gstVendorType =
                        updatedVendorDetail.GST_Vendor_Type == 0
                            ? "not_registered"
                            : "registered";

                    const result = await domain.VendorLocation.create({
                        address: updatedVendorDetail.Address,
                        address2: updatedVendorDetail.Address_2,
                        city: updatedVendorDetail.City,
                        contactPersonName: updatedVendorDetail.Contact,
                        country: updatedVendorDetail.coutryRegion,
                        email: updatedVendorDetail.Email_id,
                        gstNumber: updatedVendorDetail.GST_Registration_no,
                        phoneNumber: updatedVendorDetail.Phone_no,
                        postCode: updatedVendorDetail.postCode,
                        companyName: updatedVendorDetail.Name,
                        stateId,
                        vendorId,
                        gstVendorType,
                        panNumber: updatedVendorDetail.PAN_NO,
                        isPANAvailable:
                            updatedVendorDetail.Pan_Holder_Status != 0,
                        tinNumber: updatedVendorDetail.TIN_No,
                        taxLiable: updatedVendorDetail.Tax_Liable != 0,
                    });
                    console.log("vendor outer location");

                    vendorLocations.push(result);
                }

                if (
                    updatedVendorDetail &&
                    updatedVendorDetail.CreateModifyVendorBank.length
                ) {
                    for (const a of updatedVendorDetail.CreateModifyVendorBank) {
                        if (vendorLocations && vendorLocations.length) {
                            await domain.VendorBankDetail.create({
                                vendorLocationId: vendorLocations[0].id,
                                bankName: a.bankName,
                                branchName: a.branchName,
                                accountNumber: a.accountNumber,
                                accountHolderName: a.accHolderName,
                                IFSCCode: a.iFSCCode,
                            });
                        } else console.log("Vendor location doesnot exist");
                    }
                } else if (vendorLocations && vendorLocations.length) {
                    await domain.VendorBankDetail.create({
                        vendorLocationId: vendorLocations[0].id,
                        bankName: updatedVendorDetail.Bank_Name,
                        branchName: updatedVendorDetail.branchName,
                        accountNumber: updatedVendorDetail.Bank_Account_Number,
                        accountHolderName:
                            updatedVendorDetail.Account_Holder_Name,
                        IFSCCode: updatedVendorDetail.IFSC_Code,
                    });
                } else console.log("Vendor location does not exist ");

                if (
                    updatedVendorDetail &&
                    updatedVendorDetail.VendorSupply &&
                    updatedVendorDetail.VendorSupply.length
                ) {
                    let regionIds = [];
                    let areaIds = [];

                    for (const a of updatedVendorDetail.VendorSupply) {
                        const area = mstArea.find(
                            (ma) => ma.code == a.AreaCode
                        );

                        if (area) {
                            regionIds.push(area.regionId);
                            areaIds.push(area.id);
                        }
                    }

                    regionIds = uniq(regionIds);
                    areaIds = uniq(areaIds);

                    if (regionIds && regionIds.length) {
                        await domain.UserRegion.bulkCreate(
                            regionIds.map((region) => ({
                                regionId: region,
                                userId: vendor.User.id,
                            }))
                        );
                    }

                    if (areaIds && areaIds.length) {
                        await domain.UserArea.bulkCreate(
                            areaIds.map((area) => ({
                                areaId: area,
                                userId: vendor.User.id,
                            }))
                        );
                    }
                }
                console.log(
                    `${vendor.bbqVendorId} vendor successfully updated`
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchData = async (callback) => {
        try {
            await Promise.all([
                importPaymentTerms(),
                importStructure(),
                importSuperCategory(),
                importVendorPostingGroup(),
                importUserList(),
                importAreaCode(),
                importItem(),
            ]);

            return callback(null, {
                message: "Script completed successfully",
            });
        } catch (err) {
            return callback(err);
        }
    };

    const validateVendor = async (payload, callback) => {
        try {
            const result = await configHolder.requestUtility(
                "POST",
                `${MST_BASE_URL}/ValidateVendor`,
                payload
            );
            console.log("ERP url", MST_BASE_URL);
            console.log(
                "--------------------ERP validate vendor Api Done-------------",
                result
            );

            if (result && result.MessageType === "failure") {
                let message = "Some error occurred";

                if (result.VendorMessage) message = result.VendorMessage;
                else if (result.VendorAddressMessage)
                    message = result.VendorAddressMessage;
                else if (result.VendorBankMessage)
                    message = result.VendorBankMessage;

                throw new Error(message);
            }

            return callback(null, {
                message: "success",
            });
        } catch (err) {
            return callback(err);
        }
    };

    const validateContract = async (payload, callback) => {
        try {
            const result = await configHolder.requestUtility(
                "POST",
                `${MST_BASE_URL}/ValidatePurchPriceMultiple`,
                payload
            );
            console.log("ERP url", MST_BASE_URL);
            console.log(
                "----------------------ERP validate Contract Api Done----------------------------------",
                result
            );
            console.log(payload);

            if (result && result.Message !== "Validated") {
                let message = "Some error occurred";

                if (result.Message) message = result.Message;

                throw new Error(message);
            }

            return callback(null, {
                message: "sucess",
            });
        } catch (err) {
            return callback(err);
        }
    };

    return {
        importPaymentTerms,
        importSuperCategory,
        importStructure,
        importVendorPostingGroup,
        importAreaCode,
        importUserList,
        importItem,
        createVendor,
        pushContract,
        updateVendorData,
        createOrUpdateUserList,
        fetchData,
        validateVendor,
        validateContract,
    };
})();
