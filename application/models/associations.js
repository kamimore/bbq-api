module.exports = function (domain) {
    // ----------- User---------------------

    domain.User.hasMany(domain.Token, {
        foreignKey: 'userId',
    });

    domain.User.hasMany(domain.Log, {
        foreignKey: 'userId',
    });

    domain.User.hasMany(domain.Notification, {
        foreignKey: 'userId',
    });

    domain.User.hasMany(domain.Response, {
        foreignKey: 'userId',
    });

    domain.User.hasMany(domain.SiteSurvey, {
        foreignKey: 'assignedToId',
        as: 'AssignedTo',
    });

    domain.User.hasMany(domain.SiteSurvey, {
        foreignKey: 'createdById',
        as: 'CreatedBy',
    });

    domain.User.hasOne(domain.SiteSurveyApproval, {
        foreignKey: 'assignedToId',
        as: 'SurveyApprovalAssignedTo',
    });

    domain.User.hasOne(domain.SiteSurveyApproval, {
        foreignKey: 'assignedById',
        as: 'SurveyApprovalAssignedBy',
    });

    domain.User.hasOne(domain.SiteSurveyNote, {
        foreignKey: 'createdById',
        as: 'SurveyNoteCreatedBy',
    });

    domain.User.belongsTo(domain.Role, {
        foreignKey: 'roleId',
    });

    domain.User.hasOne(domain.Vendor, {
        foreignKey: 'userId',
    });

    domain.User.hasMany(domain.UserArea, {
        foreignKey: 'userId',
    });

    domain.UserArea.belongsTo(domain.User, {
        foreignKey: 'userId',
    });

    domain.MstArea.hasMany(domain.UserArea, {
        foreignKey: 'areaId',
    });

    domain.UserArea.belongsTo(domain.MstArea, {
        foreignKey: 'areaId',
    });

    domain.User.hasMany(domain.UserSuperCategory, {
        foreignKey: 'userId',
    });

    domain.UserSuperCategory.belongsTo(domain.User, {
        foreignKey: 'userId',
    });

    domain.User.hasMany(domain.UserRegion, {
        foreignKey: 'userId',
    });

    domain.UserRegion.belongsTo(domain.User, {
        foreignKey: 'userId',
    });

    domain.UserSuperCategory.belongsTo(domain.MstSuperCategory, {
        foreignKey: 'superCategoryId',
    });

    domain.MstSuperCategory.hasMany(domain.UserSuperCategory, {
        foreignKey: 'superCategoryId',
    });

    domain.MstRegion.hasMany(domain.UserRegion, {
        foreignKey: 'regionId',
    });

    domain.UserRegion.belongsTo(domain.MstRegion, {
        foreignKey: 'regionId',
    });

    domain.User.hasMany(domain.VendorApprovalRequest, {
        foreignKey: 'assignedToId',
        as: 'VendorApprovalAssignedTo',
    });

    domain.User.hasMany(domain.VendorApprovalRequest, {
        foreignKey: 'assignedById',
        as: 'VendorApprovalAssignedBy',
    });

    // --------------------Log--------------------

    domain.Log.belongsTo(domain.User, {
        foreignKey: 'userId',
    });

    // --------------------Token -------------------

    domain.Token.belongsTo(domain.User, {
        foreignKey: 'userId',
    });

    // --------------------Notification -------------------

    domain.Notification.belongsTo(domain.User, {
        foreignKey: 'userId',
    });

    // ----------- Role ----------------------------

    domain.Role.hasMany(domain.QuestionCategoryRole, {
        foreignKey: 'roleId',
    });

    // ----------- Question Category role  -------------------

    domain.QuestionCategoryRole.belongsTo(domain.QuestionCategory, {
        foreignKey: 'questionCategoryId',
    });

    domain.QuestionCategoryRole.belongsTo(domain.Role, {
        foreignKey: 'roleId',
    });

    // ----------- Question Category---------------------

    domain.QuestionCategory.hasMany(domain.Question, {
        foreignKey: 'questionCategoryId',
    });

    domain.QuestionCategory.hasMany(domain.QuestionCategoryRole, {
        foreignKey: 'questionCategoryId',
    });

    domain.QuestionCategory.hasMany(domain.Response, {
        foreignKey: 'questionCategoryId',
    });

    // -------------------- Question  -------------------

    domain.Question.hasMany(domain.Response, {
        foreignKey: 'questionId',
    });

    domain.Question.belongsTo(domain.QuestionCategory, {
        foreignKey: 'questionCategoryId',
    });

    // -------------------- Response  -------------------

    domain.Response.belongsTo(domain.User, {
        foreignKey: 'userId',
    });

    // domain.Response.belongsTo(domain.Question, {
    //     foreignKey: 'questionId',
    // });

    domain.Response.belongsTo(domain.SiteSurvey, {
        foreignKey: 'siteSurveyId',
    });

    domain.Response.belongsTo(domain.QuestionCategory, {
        foreignKey: 'questionCategoryId',
    });

    // -------------------- Site survey  -------------------

    domain.SiteSurvey.hasMany(domain.Response, {
        foreignKey: 'siteSurveyId',
    });

    domain.SiteSurvey.hasMany(domain.SiteSurveyApproval, {
        foreignKey: 'siteSurveyId',
    });

    domain.SiteSurvey.hasMany(domain.SiteSurveyNote, {
        foreignKey: 'siteSurveyId',
    });

    domain.SiteSurvey.belongsTo(domain.User, {
        foreignKey: 'assignedToId',
        as: 'AssignedTo',
    });

    domain.SiteSurvey.belongsTo(domain.User, {
        foreignKey: 'createdById',
        as: 'CreatedBy',
    });

    // -------------------- Site survey approval -------------------

    domain.SiteSurveyApproval.belongsTo(domain.SiteSurvey, {
        foreignKey: 'siteSurveyId',
    });

    domain.SiteSurveyApproval.belongsTo(domain.User, {
        foreignKey: 'assignedToId',
        as: 'SurveyApprovalAssignedTo',
    });

    domain.SiteSurveyApproval.belongsTo(domain.User, {
        foreignKey: 'assignedById',
        as: 'SurveyApprovalAssignedBy',
    });

    // -------------------- Site survey note -------------------

    domain.SiteSurveyNote.belongsTo(domain.SiteSurvey, {
        foreignKey: 'siteSurveyId',
    });

    domain.SiteSurveyNote.belongsTo(domain.User, {
        foreignKey: 'createdById',
        as: 'SurveyNoteCreatedBy',

    });

    // -------------------- Vendor  -------------------

    domain.Vendor.hasMany(domain.VendorLocation, {
        foreignKey: 'vendorId',
    });

    domain.Vendor.hasMany(domain.VendorApprovalRequest, {
        foreignKey: 'vendorId',
    });

    domain.Vendor.belongsTo(domain.MstVendorPostingGroup, {
        foreignKey: 'vendorPostingGroupId',
    });

    domain.Vendor.belongsTo(domain.MstStructure, {
        foreignKey: 'structureId',
    });

    domain.Vendor.belongsTo(domain.MstPaymentTerm, {
        foreignKey: 'paymentTermId',
    });

    domain.Vendor.belongsTo(domain.MstProductGroup, {
        foreignKey: 'productGroupId',
    });

    domain.Vendor.belongsTo(domain.MstVendorType, {
        foreignKey: 'vendorTypeId',
    });

    domain.Vendor.belongsTo(domain.User, {
        foreignKey: 'userId',
    });

    // -------------------- Vendor Location  -------------------

    domain.VendorLocation.hasMany(domain.VendorBankDetail, {
        foreignKey: 'vendorLocationId',
    });

    domain.VendorLocation.hasMany(domain.VendorDocument, {
        foreignKey: 'vendorLocationId',
    });

    domain.VendorLocation.belongsTo(domain.Vendor, {
        foreignKey: 'vendorId',
    });

    domain.VendorLocation.belongsTo(domain.MstState, {
        foreignKey: 'stateId',
    });

    // -------------------- Vendor Bank Detail  -------------------

    domain.VendorBankDetail.hasMany(domain.VendorDocument, {
        foreignKey: 'vendorBankDetailId',
    });

    domain.VendorBankDetail.belongsTo(domain.VendorLocation, {
        foreignKey: 'vendorLocationId',
    });

    // -------------------- Vendor Document  -------------------

    domain.VendorDocument.belongsTo(domain.VendorBankDetail, {
        foreignKey: 'vendorBankDetailId',
    });

    domain.VendorDocument.belongsTo(domain.VendorLocation, {
        foreignKey: 'vendorLocationId',
    });


    // -------------------- Vendor Approval Request  -------------------

    domain.MstSuperCategory.hasMany(domain.VendorApprovalRequest, {
        foreignKey: 'superCategoryId',
    });

    domain.VendorApprovalRequest.belongsTo(domain.MstSuperCategory, {
        foreignKey: 'superCategoryId',
    });

    domain.VendorApprovalRequest.belongsTo(domain.Vendor, {
        foreignKey: 'vendorId',
    });

    domain.VendorApprovalRequest.belongsTo(domain.User, {
        foreignKey: 'assignedToId',
        as: 'VendorApprovalAssignedTo',
    });

    domain.VendorApprovalRequest.belongsTo(domain.User, {
        foreignKey: 'assignedById',
        as: 'VendorApprovalAssignedBy',
    });

    // --------------------Mst Super Category -------------------

    domain.MstSuperCategory.hasMany(domain.MstCategory, {
        foreignKey: 'superCategoryId',
    });

    // --------------------Mst Super Category -------------------

    domain.MstCategory.belongsTo(domain.MstSuperCategory, {
        foreignKey: 'superCategoryId',
    });

    // --------------------Mst Region -------------------

    domain.MstRegion.hasMany(domain.MstArea, {
        foreignKey: 'regionId',
    });

    domain.MstArea.belongsTo(domain.MstRegion, {
        foreignKey: 'regionId',
    });

    // --------------------Mst AreaCode -------------------

    domain.MstState.hasMany(domain.MstArea, {
        foreignKey: 'stateId',
    });

    domain.MstArea.belongsTo(domain.MstState, {
        foreignKey: 'stateId',
    });

    domain.MstCity.hasMany(domain.MstArea, {
        foreignKey: 'cityId',
    });

    domain.MstArea.belongsTo(domain.MstCity, {
        foreignKey: 'cityId',
    });

    domain.MstRegion.hasMany(domain.MstArea, {
        foreignKey: 'regionId',
    });

    domain.MstArea.belongsTo(domain.MstRegion, {
        foreignKey: 'regionId',
    });

    domain.MstState.hasMany(domain.VendorLocation, {
        foreignKey: 'stateId',
    });

    // --------------------Contract -------------------

    domain.Contract.hasMany(domain.ContractApprovalRequest, {
        foreignKey: 'contractId',
    });

    domain.ContractApprovalRequest.belongsTo(domain.Contract, {
        foreignKey: 'contractId',
    });

    domain.Contract.hasMany(domain.ContractArea, {
        foreignKey: 'contractId',
    });

    domain.Contract.belongsTo(domain.MstPaymentTerm, {
        foreignKey: 'paymentTermId',
    });

    domain.MstPaymentTerm.hasMany(domain.Contract, {
        foreignKey: 'paymentTermId',
    });

    domain.MstPaymentTerm.hasMany(domain.Contract, {
        foreignKey: 'paymentTermId',
    });

    domain.ContractArea.belongsTo(domain.Contract, {
        foreignKey: 'contractId',
    });

    domain.Vendor.hasMany(domain.Contract, {
        foreignKey: 'vendorId',
    });

    domain.Contract.belongsTo(domain.Vendor, {
        foreignKey: 'vendorId',
    });

    domain.ContractTemplate.belongsTo(domain.Contract, {
        foreignKey: 'contractId',
    });

    domain.Contract.hasMany(domain.ContractTemplate, {
        foreignKey: 'contractId',
    });

    domain.MstArea.hasMany(domain.ContractArea, {
        foreignKey: 'areaId',
    });

    domain.ContractArea.belongsTo(domain.MstArea, {
        foreignKey: 'areaId',
    });

    domain.User.hasMany(domain.Contract, {
        foreignKey: 'createdBy',
    });

    domain.Contract.belongsTo(domain.User, {
        foreignKey: 'createdBy',
    });

    // domain.MstCategory.hasMany(domain.Contract, {
    //     foreignKey: 'categoryId',
    // });

    // domain.Contract.belongsTo(domain.MstCategory, {
    //     foreignKey: 'categoryId',
    // });

    domain.Contract.hasMany(domain.ContractCategory, {
        foreignKey: 'contractId'
    });

    domain.ContractCategory.belongsTo(domain.Contract, {
        foreignKey: 'contractId'
    });

    domain.ContractCategory.belongsTo(domain.MstCategory, {
        foreignKey: 'categoryId'
    });

    domain.MstCategory.hasMany(domain.ContractCategory, {
        foreignKey: 'categoryId'
    });

    // domain.MstPaymentTerm.hasMany(domain.Contract, {
    //     foreignKey: 'paymentTermId',
    // });

    // domain.Contract.belongsTo(domain.MstPaymentTerm, {
    //     foreignKey: 'paymentTermId',
    // });

    // --------------------  Item  -------------------

    domain.MstCategory.hasMany(domain.MstItemCategory, {
        foreignKey: 'categoryId',
    });

    domain.MstItemCategory.belongsTo(domain.MstCategory, {
        foreignKey: 'categoryId',
    });

    domain.MstItemCategory.hasMany(domain.MstProductGroup, {
        foreignKey: 'itemCategoryId',
    });

    domain.MstProductGroup.belongsTo(domain.MstItemCategory, {
        foreignKey: 'itemCategoryId',
    });

    domain.MstProductGroup.hasMany(domain.MstItem, {
        foreignKey: 'productGroupId',
    });

    domain.MstItem.belongsTo(domain.MstProductGroup, {
        foreignKey: 'productGroupId',
    });

    domain.MstItem.hasMany(domain.ContractItem, {
        foreignKey: 'itemId',
    });

    domain.ContractItem.belongsTo(domain.MstItem, {
        foreignKey: 'itemId',
    });

    domain.Contract.hasMany(domain.ContractItem, {
        foreignKey: 'contractId',
    });

    domain.ContractItem.belongsTo(domain.Contract, {
        foreignKey: 'contractId',
    });

    // -------------------- Contract Document  -------------------

    domain.Contract.hasMany(domain.ContractDocument, {
        foreignKey: 'contractId',
    });

    domain.ContractDocument.belongsTo(domain.Contract, {
        foreignKey: 'contractId',
    });

    // -------------------- Contract Approval  -------------------

    domain.ContractApprovalRequest.belongsTo(domain.User, {
        foreignKey: 'assignedToId',
    });

    // domain.User.hasMany(domain.ContractApprovalRequest, {
    //     foreignKey: 'assignedToId'
    // });

    // -------------------- Mst Term condition  -------------------

    // domain.MstTermCondition.hasMany(domain.MstSubTermCondition, {
    //     foreignKey: 'termConditionId',
    // });

    // domain.MstSubTermCondition.belongsTo(domain.MstTermCondition, {
    //     foreignKey: 'termConditionId',
    // });

    // -------------------- Term condition  -------------------

    domain.TermCondition.hasMany(domain.TermCondition, {
        foreignKey: 'parentId',
    });

    domain.TermCondition.belongsTo(domain.TermCondition, {
        foreignKey: 'parentId',
    });

    // -------------------- Category Term condition  -------------------

    domain.TermCondition.hasMany(domain.CategoryTermCondition, {
        foreignKey: 'termConditionId',
    });

    domain.CategoryTermCondition.belongsTo(domain.TermCondition, {
        foreignKey: 'termConditionId',
    });

    domain.MstCategory.hasMany(domain.CategoryTermCondition, {
        foreignKey: 'subCategoryId',
    });

    domain.CategoryTermCondition.belongsTo(domain.MstCategory, {
        foreignKey: 'subCategoryId',
    });
};
