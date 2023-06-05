const {
    merge,
} = require('lodash');
const validate = require('express-validation');
const multipart = require('connect-multiparty');
const validationSchema = require('../application/validations/index');
const middleware = require('../middlewares/authentication');
const errorHandler = require('../middlewares/error-handler');
const setEndpoint = require('../helpers/utilities/set-endpoint');
const multer = require('multer');

const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, "");
    },
    // filename: function (req, file, cb) {
    //     cb(null, `${Date.now()}-${req.params.subFolder}-${file.originalname.split(" ").join("-")}`)
    // }
})
const uploads = multer({ storage: storage })

const multipartMiddleware = multipart();

module.exports = function ({
    controllers,
    views,
}) {
    views = {
        json: views.jsonView,
    };

    const apis = {
        // -------- Authentication && Registration API ------------------------------

        '/api/v1/register/vendor': [{
            method: 'POST',
            action: controllers.registrationController.registerVendor,
            middleware: [
                middleware.auth('anonymous'),
                // validate(validationSchema.authentication.registerVendor),
                errorHandler,
            ],
            views,
        }],

        '/api/v1/verify-email/:token': [{
            method: 'GET',
            action: controllers.authenticationController.verifyEmail,
            middleware: [
                middleware.auth('anonymous'),
                validate(validationSchema.authentication.verifyEmail),
                errorHandler,
            ],
            views,
        }],

        '/api/v1/check-unique-user': [{
            method: 'POST',
            action: controllers.userController.checkUniqueUser,
            middleware: [
                middleware.auth('anonymous'),
                errorHandler,
            ],
            views,
        }],

        '/api/v1/login': [{
            method: 'POST',
            action: controllers.authenticationController.login,
            middleware: [
                middleware.auth('anonymous'),
                validate(validationSchema.authentication.login),
                errorHandler,
            ],
            views,
        }],

        '/api/v1/logout': [{
            method: 'GET',
            action: controllers.authenticationController.logout,
            middleware: [
                middleware.auth('authenticated'),
            ],
            views,
        }],

        '/api/v1/forgot-password': [{
            method: 'POST',
            action: controllers.authenticationController.forgotPassword,
            middleware: [
                middleware.auth('anonymous'),
                // validate(validationSchema.authentication.forgotPassword),
                errorHandler,
            ],
            views,
        }],

        '/api/v1/reset-password': [{
            method: 'PUT',
            action: controllers.authenticationController.resetPassword,
            middleware: [
                middleware.auth('anonymous'),
                validate(validationSchema.authentication.resetPassword),
                errorHandler,
            ],
            views,
        }],

        '/api/v1/validate-token': [{
            method: 'GET',
            action: controllers.authenticationController.validateToken,
            middleware: [
                middleware.auth('authenticated'),
            ],
            views,
        }],

        // ----------------- User API --------------------------------------

        '/api/v1/user/change-password': [{
            method: 'PATCH',
            action: controllers.userController.changePassword,
            middleware: [
                middleware.auth('authenticated'),
                // validate(validationSchema.user.changePassword),
                errorHandler,
            ],
            views,
        }],

        '/api/v1/user/create-password': [{
            method: 'POST',
            action: controllers.userController.createPassword,
            middleware: [
                errorHandler,
            ],
            views,
        }],

        '/api/v1/user/change-email': [{
            method: 'PATCH',
            action: controllers.userController.changeEmail,
            middleware: [
                middleware.auth('authenticated'),
                // validate(validationSchema.user.changeEmail),
                errorHandler,
            ],
            views,
        }],

        // --------------------------- Mobile apis -------------------------------

        '/api/v1/mobile/site-survey': [{
            method: 'GET',
            action: controllers.siteSurveyController.getSurveys,
            middleware: [
                middleware.auth('authenticated'),
                errorHandler,
            ],
            views,
        }],

        '/api/v1/mobile/site-survey/:id': [{
            method: 'GET',
            action: controllers.siteSurveyController.getSurveyDetail,
            middleware: [
                middleware.auth('authenticated'),
                errorHandler,
            ],
            views,
        }],

        '/api/v1/mobile/site-survey-approval/:id': [{
            method: 'GET',
            action: controllers.siteSurveyController.getSurveyApprovalRequest,
            middleware: [
                middleware.auth('authenticated'),
                errorHandler,
            ],
            views,
        }],

        '/api/v1/mobile/site-survey-status': [{
            method: 'GET',
            action: controllers.siteSurveyController.getSurveyStatus,
            middleware: [
                middleware.auth('authenticated'),
                errorHandler,
            ],
            views,
        }],

        '/api/v1/mobile/user-list/:surveyId': [{
            method: 'GET',
            action: controllers.userController.getUserList,
            middleware: [
                middleware.auth('authenticated'),
                errorHandler,
            ],
            views,
        }],

        '/api/v1/mobile/site-survey-approval': [{
            method: 'POST',
            action: controllers.siteSurveyApprovalController.createApprovalRequests,
            middleware: [
                middleware.auth('authenticated'),
                errorHandler,
            ],
            views,
        }],

        // ----------------- SMS apis -----------------------------
        '/api/v1/send-sms': [{
            method: 'POST',
            action: controllers.smsController.send,
            middleware: [
                middleware.auth('anonymous'),
                errorHandler,
            ],
            views,
        }],
        '/api/v1/verify-otp': [{
            method: 'POST',
            action: controllers.smsController.verify,
            middleware: [
                middleware.auth('anonymous'),
                errorHandler,
            ],
            views,
        }],

        '/api/v1/verify-password-send-otp': [{
            method: 'POST',
            action: controllers.userController.verifyPasswordAndSendOTP,
            middleware: [
                middleware.auth('authenticated'),
                errorHandler,
            ],
            views,
        }],

        '/api/v1/verify-otp-update-phone': [{
            method: 'POST',
            action: controllers.userController.updatePhone,
            middleware: [
                middleware.auth('authenticated'),
                errorHandler,
            ],
            views,
        }],

        // ------- Convert CSV to JSON ---------------------------------------------

        '/api/v1/csv-to-json': [{
            method: 'POST',
            action: controllers.userController.csvToJson,
            middleware: [errorHandler, multipartMiddleware],
            views,
        }],

        // ----------------- Vendor api -----------------------------------------

        '/api/v1/vendor/send-login-link': [{
            method: 'POST',
            action: controllers.vendorController.sendLoginLink,
            middleware: [
                middleware.auth('authenticated'),
                errorHandler,
            ],
            views,
        }],

        '/api/v1/vendor-list': [{
            method: 'POST',
            action: controllers.vendorController.getVendorList,
            middleware: [
                middleware.auth('anonymous'),
                errorHandler,
            ],
            views,
        }],

        // -------------------------- Admin api -----------------------------

        '/api/v1/stealth-login': [{
            method: 'POST',
            action: controllers.authenticationController.stealthLogin,
            middleware: [
                middleware.auth('admin'),
                errorHandler,
            ],
            views,
        }],

        // -------------------------- BBQ ERP api -----------------------------

        '/api/v1/fetch-erp-data': [{
            method: 'GET',
            action: controllers.erpController.fetchData,
            middleware: [
                middleware.auth('admin'),
                errorHandler,
            ],
            views,
        }],

        '/api/v1/validate/vendor': [{
            method: 'POST',
            action: controllers.erpController.validateVendor,
            middleware: [
                middleware.auth('authenticated'),
                errorHandler,
            ],
            views,
        }],

        '/api/v1/validate/contract': [{
            method: 'POST',
            action: controllers.erpController.validateContract,
            middleware: [
                middleware.auth('authenticated'),
                errorHandler,
            ],
            views,
        }],

        // ----------------Upload Image--------------------

        '/api/v1/upload-image/:subFolder': [{
            method: 'POST',
            action: controllers.userController.uploadImage,
            middleware: [errorHandler, uploads.single('file'), middleware.auth('anonymous')],
            views,
        }],

    };

    // ------------------------- Master api -------------------------------------

    const mstSuperCategoryApis = setEndpoint('mst-super-category', app, domain.MstSuperCategory);
    const mstAreaApis = setEndpoint('mst-area', app, domain.MstArea);
    const mstCityApis = setEndpoint('mst-city', app, domain.MstCity);
    const mstStateApis = setEndpoint('mst-state', app, domain.MstState);
    const mstRegionApis = setEndpoint('mst-region', app, domain.MstRegion);
    const mstStructureApis = setEndpoint('mst-structure', app, domain.MstStructure);
    const mstPaymentTermApis = setEndpoint('mst-payment-term', app, domain.MstPaymentTerm);
    const mstProductGroupApis = setEndpoint('mst-product-group', app, domain.MstProductGroup);
    const mstVendorPostingGroupApis = setEndpoint('mst-vendor-posting-group', app, domain.MstVendorPostingGroup);
    const mstCategory = setEndpoint('mst-category', app, domain.MstCategory);
    const mstItemCategory = setEndpoint('mst-item-category', app, domain.MstItemCategory);
    const mstItem = setEndpoint('mst-item', app, domain.MstItem);
    const mstDeliveryTerm = setEndpoint('mst-delivery-term', app, domain.MstDeliveryTerm);
    const mstAdvancePayment = setEndpoint('mst-advance-payment', app, domain.MstAdvancePayment);
    const mstVendorTypeApis = setEndpoint('mst-vendor-type', app, domain.MstVendorType);

    // ------------------------- common api -------------------------------------

    const logApis = setEndpoint('log', app, domain.Log);
    const userApis = setEndpoint('user', app, domain.User);
    const userSuperCategories = setEndpoint('user-super-category', app, domain.UserSuperCategory);
    const userAreas = setEndpoint('user-area', app, domain.UserArea);
    const userRegions = setEndpoint('user-region', app, domain.UserRegion);
    const notificationApis = setEndpoint('notification', app, domain.Notification);
    const roleApis = setEndpoint('role', app, domain.Role);

    // ------------------------- bd api -----------------------------------------

    const siteSurveyApis = setEndpoint('site-survey', app, domain.SiteSurvey);
    const questionCategoryApis = setEndpoint('question-category', app, domain.QuestionCategory);
    const questionCategoryRoleApis = setEndpoint('question-category-role', app, domain.QuestionCategoryRole);
    const questionApis = setEndpoint('question', app, domain.Question);
    const responseApis = setEndpoint('response', app, domain.Response);
    const siteSurveyApproval = setEndpoint('site-survey-approval', app, domain.SiteSurveyApproval);
    const siteSurveyNote = setEndpoint('site-survey-note', app, domain.SiteSurveyNote);

    // ------------------------- vendor api -------------------------------------

    const vendorApis = setEndpoint('vendor', app, domain.Vendor);
    const vendorLocationApis = setEndpoint('vendor-location', app, domain.VendorLocation);
    const vendorBankDetailApis = setEndpoint('vendor-bank-detail', app, domain.VendorBankDetail);
    const vendorApprovalRequestApis = setEndpoint('vendor-approval-request', app, domain.VendorApprovalRequest);
    const vendorDocumentApis = setEndpoint('vendor-document', app, domain.VendorDocument);

    // ------------------------- contract api -------------------------------------

    const contractApis = setEndpoint('contract', app, domain.Contract);
    const contractAreaApis = setEndpoint('contract-area', app, domain.ContractArea);
    const contractItemApis = setEndpoint('contract-item', app, domain.ContractItem);
    const contractDocumentApis = setEndpoint('contract-document', app, domain.ContractDocument);
    const contractTemplateApis = setEndpoint('contract-template', app, domain.ContractTemplate);
    const contractApprovalRequestApis = setEndpoint('contract-approval-request', app, domain.ContractApprovalRequest);
    const termConditionApis = setEndpoint('term-condition', app, domain.TermCondition);
    const categoryTermConditionApis = setEndpoint('category-term-condition', app, domain.CategoryTermCondition);
    const categoryAdvancePayment = setEndpoint('category-advance-payment', app, domain.CategoryAdvancePayment);
    const categoryDeliveryTerm = setEndpoint('category-delivery-term', app, domain.CategoryDeliveryTerm);
    const contractCategory = setEndpoint('contract-category', app, domain.ContractCategory);

    return merge(
        apis,
        mstSuperCategoryApis,
        mstAreaApis,
        mstCityApis,
        mstPaymentTermApis,
        mstStateApis,
        mstRegionApis,
        mstProductGroupApis,
        mstVendorPostingGroupApis,
        mstStructureApis,
        logApis,
        userApis,
        notificationApis,
        roleApis,
        siteSurveyApis,
        questionCategoryApis,
        questionCategoryRoleApis,
        questionApis,
        responseApis,
        vendorApis,
        vendorApprovalRequestApis,
        vendorLocationApis,
        vendorBankDetailApis,
        vendorDocumentApis,
        siteSurveyApproval,
        siteSurveyNote,
        mstCategory,
        userAreas,
        userSuperCategories,
        userRegions,
        contractApis,
        contractAreaApis,
        mstItemCategory,
        contractItemApis,
        mstItem,
        contractDocumentApis,
        contractTemplateApis,
        termConditionApis,
        mstDeliveryTerm,
        mstAdvancePayment,
        categoryTermConditionApis,
        categoryDeliveryTerm,
        categoryAdvancePayment,
        contractApprovalRequestApis,
        mstVendorTypeApis,
        contractCategory,
    );
};
