/* eslint-disable no-restricted-syntax */
const ERPService = require('../../../controller-service-layer/services/common/BBQ-ERPService');

module.exports = async function (data) {
    const vendor = await domain.Vendor.findOne({
        where: {
            id: data.id,
        },
        include: [{
            model: domain.MstVendorPostingGroup,
        }, {
            model: domain.MstProductGroup,
        }, {
            model: domain.MstStructure,
        }, {
            model: domain.MstPaymentTerm,
        }, {
            model: domain.User,
            include: [{
                model: domain.UserSuperCategory,
                include: [{
                    model: domain.MstSuperCategory,
                }],
            }],
        }, {
            model: domain.VendorLocation,
            where: {
                isDeleted: false,
            },
            include: [{
                model: domain.VendorBankDetail,
            }, {
                model: domain.MstState,
            }],
        }],
    });

    if (!vendor) {
        console.log('Vendor not found');
        return;
    }

    // Preparing vendor payload
    const object = {
        vendorNo: vendor.bbqVendorId || '',
        referenceNo: `VENP${vendor.userId}`,
        Name: vendor.companyName || '',
        Pan_Holder_Status: '0',
        Payment_Terms_code: vendor.MstPaymentTerm ? vendor.MstPaymentTerm.code : '',
        Vendor_Posting_Group: vendor.MstVendorPostingGroup ? vendor.MstVendorPostingGroup.code : '',
        Structure: vendor.MstStructure ? vendor.MstStructure.code : 'GST',
        vATRegNo: vendor.vatRegisterationNumber || '',
        State_code: '',
        Address: '',
        Address_2: '',
        City: '',
        postCode: '',
        Contact: '',
        Phone_no: '',
        Email_id: '',
        GST_Registration_no: '',
        GST_Vendor_Type: '',
        PAN_NO: '',
        // TIN_No: vendor.vatRegisterationNumber || '',
        TIN_No: '',
        Bank_Name: '',
        Bank_Account_Number: '',
        IFSC_Code: '',
        Account_Holder_Name: '',
        branchName: '',
        Tax_Liable: '0',
        divisionCode: '1',
        CreateModifyVendorBank: [],
        InsertModifyVendorAddress: [],
        VendPortalServices: '',
        Food: '0',
        NonFood: '0',
        Beverage: '0',
        genBusPostGrp: 'MAIN STORE',
        vATBusPostGrp: 'VAT',
        MSME: vendor.isMSME ? '1' : '0',
        Priority: vendor.priority || '0',
    };

    // -------------------------- vendor supercategory--------------------------------
    if (vendor.User.UserSuperCategories && vendor.User.UserSuperCategories.length) {
        for (const row of vendor.User.UserSuperCategories) {
            if (row.MstSuperCategory.name === 'Food') {
                object.Food = '1';
                console.log('Food : 1');
            }
            if (row.MstSuperCategory.name === 'NonFood') {
                object.NonFood = '1';
                console.log('NonFood : 1');
            }
            if (row.MstSuperCategory.name === 'Beverage') {
                object.Beverage = '1';
                console.log('Beverage : 1');
            }
        }
    }

    // -------------------------- Vendor bank and location------------------------------
    const vendorBanks = [];
    const vendorAddress = [];

    const locations = vendor.VendorLocations.filter(l => l.isDeleted == false);

    if (locations && locations.length) {
        for (const row of locations) {
            const bankDetails = row.VendorBankDetails[0];

            const bankObject = {
                vendorNo: vendor.bbqVendorId || '',
                bankCode: bankDetails.id || '', // 20 len
                bankName: bankDetails.bankName || '', // 50 len
                accountNumber: bankDetails.accountNumber || '',
                iFSCCode: bankDetails.IFSCCode || '',
                accHolderName: bankDetails.accountHolderName || '',
                branchName: bankDetails.branchName || '',
                divisionCode: '1',
                paymentTermsCode: '',
            };

            console.log('bankObject', bankObject);
            const addressObject = {
                vendorNo: vendor.bbqVendorId ? vendor.bbqVendorId : '',
                addressCode: '',
                vendorName: vendor.companyName || '',
                address: row.address || '',
                address2: row.address2 || '',
                postCode: row.postCode || '',
                orderCity: row.city || '',
                coutryRegion: 'IN',
                mobileNo: row.phoneNumber || '',
                stateCode: row.MstState ? row.MstState.code : '',
                gSTRegistrationNo: row.gstNumber || '',
                gSTVendorType: row.gstVendorType === 'registered' ? '1' : '3',
                email: row.email || '',
            };
            console.log('addressObject', addressObject);

            vendorBanks.push(bankObject);
            vendorAddress.push(addressObject);
        }
    }

    object.CreateModifyVendorBank = vendorBanks;
    object.InsertModifyVendorAddress = vendorAddress;

    if (locations && locations.length) {
        const location = locations[0];

        const bank = (location.VendorBankDetails && location.VendorBankDetails.length) ? location.VendorBankDetails[0] : null;

        Object.assign(object, {
            Tax_Liable: location.taxLiable ? '1' : '0',
            Pan_Holder_Status: '0',
            Address: location.address || '',
            Address_2: location.address2 || '',
            City: location.city || '',
            postCode: location.postCode || '',
            Contact: location.contactPersonName || '',
            Phone_no: location.phoneNumber || '',
            Email_id: location.email || '',
            GST_Registration_no: location.gstNumber || '',
            GST_Vendor_Type: location.gstVendorType === 'registered' ? '1' : '3',
            PAN_NO: location.panNumber || '',
            // TIN_No: !object.TIN_No ? location.tinNumber : '',
            TIN_No: location.tinNumber ? location.tinNumber : '',
            Bank_Name: (bank && bank.bankName) ? bank.bankName : '',
            Bank_Account_Number: (bank && bank.accountNumber) ? bank.accountNumber : '',
            IFSC_Code: (bank && bank.IFSCCode) ? bank.IFSCCode : '',
            Account_Holder_Name: (bank && bank.accountHolderName) ? bank.accountHolderName : '',
            branchName: (bank && bank.branchName) ? bank.branchName : '',
            State_code: (location && location.MstState) ? location.MstState.code : '',
            country: 'IN',
        });
    }

    console.log('vendor erp payload', object);

    const result = await ERPService.createVendor(object);

    domain.Log.createChangeLog({
        type: 'create_vendor_erp',
        userId: vendor.userId,
        newItem: {
            request: object,
            response: result,
            vendorId: vendor.id || null,
        },
    });

    console.log('result', result);

    if (result && result.MessageType === 'failure') throw new Error(result.Message);

    if (result && !vendor.bbqVendorId) {
        await domain.Vendor.update({
            bbqVendorId: result.VendorNo,
        }, {
            where: {
                id: vendor.id,
            },
        });
    }

    return result;
};
