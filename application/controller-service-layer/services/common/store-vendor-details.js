const US = require("underscore");
const VENDOR_DATA = require("../../../../docs/vendor.json");
const uuid = require("node-uuid");
const uniqBy = require("lodash/uniqBy");

const vendorWithBank = VENDOR_DATA.map(v => {
    // const obj = VENDOR_DATA.BankAccount.find(a => a["Vendor No_"] === v.No_);
    // const obj3 = VENDOR_DATA.Address.find(c => c["Vendor No_"] === v.No_);
    return {
        ...v,
        BankAccount: [],
        VAddress: []
        // BankAccount: obj,
        // VAddress: obj3
    };
});

module.exports = (function () {
    const ImportVendor = async () => {
        const [
            mstVendorPostingGroup,
            mstState,
            mstSuperCategories,
            mstProductGroup,
            mstStructure,
            Vendor
        ] = await Promise.all([
            domain.MstVendorPostingGroup.findAll(),
            domain.MstState.findAll(),
            domain.MstSuperCategory.findAll(),
            domain.MstProductGroup.findAll(),
            domain.MstStructure.findAll(),
            domain.Vendor.findAll()
        ]);

        const uniqVendors = uniqBy(vendorWithBank, "No_");
        for (vendor of uniqVendors) {
            console.log('vendor.No_', vendor.No_)
            let email = null;
            if (vendor["E-Mail"]) {
                if (vendor["E-Mail"].includes(";"))
                    email = vendor["E-Mail"].split(";")[0];
                else if (vendor["E-Mail"].includes(":"))
                    email = vendor["E-Mail"].split(":")[0];
                else email = vendor["E-Mail"];
            }
            const salt = uuid.v1();
            if (vendor && vendor.No_.startsWith("V")) {
                const existingVendor = Vendor.find(
                    a => a.bbqVendorId === vendor.No_
                );
                if (!existingVendor) {
                    // create User
                    const user = await domain.User.create({
                        userName: email,
                        fullName: vendor.Contact,
                        phone: vendor["Phone No_"],
                        userType: "vendor",
                        email,
                        salt
                    });

                    const vendorPostingGroup = mstVendorPostingGroup.find(
                        a => a.code === vendor["Vendor Posting Group"]
                    );

                    if (user) {
                        const applicationMethod =
                            vendor["Application Method"] == 0
                                ? "manual"
                                : "apply_to_oldest";
                        const userId = user.id ? user.id : user.dataValues.id;

                        // create user super category
                        const superCategories = [];

                        const food =
                            vendor["Food Supply"] == 1
                                ? mstSuperCategories.find(
                                      a => a.name === "Food"
                                  )
                                : null;
                        const nonFood =
                            vendor["Nonfood Supply"] == 1
                                ? mstSuperCategories.find(
                                      a => a.name === "NonFood"
                                  )
                                : null;
                        const beverage =
                            vendor["Food&Nonfood Supply"] == 1
                                ? mstSuperCategories.find(
                                      a => a.name === "Beverage"
                                  )
                                : null;

                        if (food) superCategories.push(food);
                        if (nonFood) superCategories.push(nonFood);
                        if (beverage) superCategories.push(beverage);

                        for (const superCategory of superCategories) {
                            // create user super category
                            await domain.UserSuperCategory.create({
                                userId,
                                superCategoryId: superCategory.id
                            });
                        }

                        const productGroup = mstProductGroup.find(
                            a => a.code === vendor["Vendor Product Code"]
                        );
                        const productGroupId =
                            productGroup && productGroup.id
                                ? productGroup.id
                                : null;

                        const structure = mstStructure.find(
                            a => a.code === vendor.Structure
                        );
                        const structureId =
                            structure && structure.id ? structure.id : null;

                        const isMSME = vendor.MSME == 0 ? false : true;
                        const isDeleted =
                            vendor["Block Permenantly"] == 0 ? false : true;
                        const isSSI = vendor.SSI == 0 ? false : true;
                        const composition =
                            vendor.Composition == 0 ? false : true;
                        const transporter =
                            vendor.Transporter == 0 ? false : true;
                        const subContractor =
                            vendor.Subcontractor == 0 ? false : true;

                        // create vendor

                        const uVendor = await domain.Vendor.create({
                            userId,
                            companyName: vendor.Name,
                            vendorPostingGroupId:
                                vendorPostingGroup && vendorPostingGroup.id
                                    ? vendorPostingGroup.id
                                    : null,
                            priority: vendor.Priority,
                            generalBusPostingGroup:
                                vendor["Gen_ Bus_ Posting Group"],
                            vatBusPostingGroup:
                                vendor["VAT Bus_ Posting Group"],
                            bbqVendorId: vendor.No_,
                            ssiValidity: vendor["SSI Validity Date"],
                            invoicing: vendor["Invoice Disc_ Code"],
                            cashLimit: vendor["Budgeted Amount"],
                            type: "imported",
                            applicationMethod,
                            productGroupId,
                            structureId,
                            isMSME,
                            isDeleted,
                            isSSI,
                            composition,
                            transporter,
                            subContractor
                        });

                        if (uVendor) {
                            // uVendor.bbqVendorId === vendor.No_
                            const vendorId = uVendor.id
                                ? uVendor.id
                                : uVendor.dataValues.id;
                            const state = mstState.find(
                                a => a.code === vendor["State Code"]
                            );
                            const stateId = state && state.id ? state.id : null;
                            const isPANAvailable =
                                vendor["P_A_N_ Status"] == 0 ? false : true;
                            const taxLiable =
                                vendor["Tax Liable"] == 0 ? false : true;

                            // create vendor location
                            const vendorLocation = await domain.VendorLocation.create(
                                {
                                    vendorId,
                                    address:
                                        vendor.VAddress &&
                                        vendor.VAddress.Address
                                            ? vendor.VAddress.Address
                                            : null,
                                    address2:
                                        vendor.VAddress &&
                                        vendor.VAddress["Address 2"]
                                            ? vendor.VAddress["Address 2"]
                                            : null,
                                    stateCode: vendor["State Code"],
                                    city:
                                        vendor.VAddress && vendor.VAddress.city
                                            ? vendor.VAddress.city
                                            : null,
                                    postCode:
                                        vendor.VAddress &&
                                        vendor.VAddress["Post Code"]
                                            ? vendor.VAddress["Post Code"]
                                            : null,
                                    contactPersonName: vendor.Contact,
                                    panNumber: vendor["P_A_N_ No_"],
                                    tinNumber: vendor["T_I_N_ No_"],
                                    gstNumber: vendor["GST Registration No_"],
                                    country: vendor.County,
                                    stateId,
                                    isPANAvailable,
                                    taxLiable,
                                    gstVendorType: vendor["GST Vendor Type"],
                                    phoneNumber: vendor["Phone No_"],
                                    email,
                                    landlineNumber: vendor["Landline No_"],
                                    fax: vendor["Fax No_"]
                                }
                            );

                            if (vendorLocation) {
                                const vendorLocationId = vendorLocation.id
                                    ? vendorLocation.id
                                    : vendorLocation.dataValues.id;

                                // create vendor bank details
                                const vendorBankDetail = await domain.VendorBankDetail.create(
                                    {
                                        vendorLocationId,
                                        bankName:
                                            vendor.BankAccount &&
                                            vendor.BankAccount.Name
                                                ? vendor.BankAccount.Name
                                                : null,
                                        branchName:
                                            vendor.BankAccount &&
                                            vendor.BankAccount.Address
                                                ? vendor.BankAccount.Address
                                                : null,
                                        accountNumber:
                                            vendor.BankAccount &&
                                            vendor.BankAccount[
                                                "Bank Account No_"
                                            ]
                                                ? vendor.BankAccount[
                                                      "Bank Account No_"
                                                  ]
                                                : null,
                                        accountHolderName:
                                            vendor.BankAccount &&
                                            vendor.BankAccount.Contact
                                                ? vendor.BankAccount.Contact
                                                : null,
                                        IFSCCode:
                                            vendor.BankAccount &&
                                            vendor.BankAccount[
                                                "Bank Branch No_"
                                            ]
                                                ? vendor.BankAccount[
                                                      "Bank Branch No_"
                                                  ]
                                                : null
                                    }
                                );
                            }
                        }
                    }
                } else {
                    console.log('Vendor already exist Already exist')
                }
            }
        }
        console.log("script completed");
    };

    return {
        ImportVendor
    };
})();
