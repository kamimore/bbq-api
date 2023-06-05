// ------------------------- Master table ----------------------------

const MstSuperCategory = require('./mst-super-category');
const MstCategory = require('./mst-category');
const MstArea = require('./mst-area');
const MstCity = require('./mst-city');
const MstState = require('./mst-state');
const MstPaymentTerm = require('./mst-payment-term');
const MstProductGroup = require('./mst-product-group');
const MstStructure = require('./mst-structure');
const MstVendorPostingGroup = require('./mst-vendor-posting-group');
const MstRegion = require('./mst-region');
const TermCondition = require('./term-condition');
const MstItemCategory = require('./mst-item-category');
const MstItem = require('./mst-item');
const MstDeliveryTerm = require('./mst-delivery-period');
const MstAdvancePayment = require('./mst-advance-payment');
const CategoryTermCondition = require('./category-term-condition');
const MstVendorType = require('./mst-vendor-type');

// ------------------------- Common table ----------------------------

const Log = require('./log');
const Token = require('./tokens');
const Otp = require('./otp');
const User = require('./user');
const Notification = require('./notification');
const SiteSurvey = require('./site-survey');
const Role = require('./role');
const SiteSurveyNote = require('./site-survey-note');
const SiteSurveyApproval = require('./site-survey-approval');
const UserArea = require('./user-area');
const UserSuperCategory = require('./user-super-category');
const UserRegion = require('./user-region');

// ------------------------- BD table --------------------------------

const QuestionCategory = require('./question-category');
const QuestionCategoryRole = require('./question-category-role');
const Question = require('./question');
const Response = require('./response');

// ------------------------- Vendor table ----------------------------

const Vendor = require('./vendor');
const VendorLocation = require('./vendor-location');
const VendorBankDetail = require('./vendor-bank-detail');
const VendorApprovalRequest = require('./vendor-approval-request');
const VendorDocument = require('./vendor-document');

// ------------------------- Contract table ----------------------------

const Contract = require('./contract');
const ContractArea = require('./contract-area');
const ContractItem = require('./contract-item');
const ContractDocument = require('./contract-document');
const ContractTemplate = require('./contract-template');
const ContractApprovalRequest = require('./contract-approval-request');

const CategoryAdvancePayment = require('./category-advance-payment');
const CategoryDeliveryTerm = require('./category-delivery-term');
const ContractCategory = require('./contract-category');

const domain = {
    Log,
    Token,
    User,
    Notification,
    SiteSurvey,
    SiteSurveyNote,
    SiteSurveyApproval,
    Role,
    QuestionCategory,
    QuestionCategoryRole,
    Question,
    Response,
    Vendor,
    VendorLocation,
    VendorBankDetail,
    VendorApprovalRequest,
    VendorDocument,
    MstArea,
    MstCity,
    MstSuperCategory,
    MstCategory,
    MstState,
    MstPaymentTerm,
    MstDeliveryTerm,
    MstAdvancePayment,
    MstProductGroup,
    MstStructure,
    MstVendorPostingGroup,
    MstRegion,
    UserArea,
    UserSuperCategory,
    UserRegion,
    MstItemCategory,
    MstItem,
    Contract,
    ContractArea,
    ContractDocument,
    ContractItem,
    Otp,
    ContractTemplate,
    TermCondition,
    CategoryTermCondition,
    CategoryAdvancePayment,
    CategoryDeliveryTerm,
    ContractApprovalRequest,
    MstVendorType,
    ContractCategory,
};

require('./associations')(domain);

module.exports = domain;
