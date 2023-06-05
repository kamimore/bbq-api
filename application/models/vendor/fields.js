module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        allowNull: false,
    },
    companyName: {
        type: Sequelize.TEXT,
        field: 'company_name',
        trim: true,
    },
    status: {
        type: Sequelize.TEXT, // draft, pending, approved_by_sourcing, approved_by_mdm, change_requested, rejected_by_sourcing, rejected_by_mdm
        defaultValue: 'draft',
        trim: true,
    },
    vendorPostingGroupId: {
        type: Sequelize.INTEGER,
        field: 'vendor_posting_group_id',
    },
    productGroupId: {
        type: Sequelize.INTEGER,
        field: 'product_group_id',
    },
    structureId: {
        type: Sequelize.INTEGER,
        field: 'structure_id',
    },
    paymentTermId: {
        type: Sequelize.INTEGER,
        field: 'payment_term_id',
    },
    priority: {
        type: Sequelize.TEXT,
        trim: true,
        comment: 'This is required to prioritize payments to vendors',
    },
    generalBusPostingGroup: {
        type: Sequelize.TEXT,
        field: 'general_bus_posting_group',
        defaultValue: 'main_store',
        trim: true,
    },
    showLedger: {
        type: Sequelize.BOOLEAN,
        field: 'show_ledger',
        defaultValue: false,
    },
    vatBusPostingGroup: {
        type: Sequelize.TEXT,
        field: 'vat_bus_posting_group',
        defaultValue: 'vat',
        trim: true,
    },
    invoicing: {
        type: Sequelize.TEXT,
        trim: true,
    },
    applicationMethod: {
        type: Sequelize.TEXT, // manual, apply_to_oldest
        defaultValue: 'manual',
        field: 'application_method',
        trim: true,
    },
    vatRegisterationNumber: {
        type: Sequelize.TEXT,
        trim: true,
        field: 'vat_registeration_number',
        comment: 'A text box to be filled at time of registration – To be filled by Vendor',
    },
    comment: {
        type: Sequelize.TEXT,
        trim: true,
    },
    bbqVendorId: {
        type: Sequelize.TEXT,
        field: 'bbq_vendor_id',
        trim: true,
    },
    isMSME: {
        type: Sequelize.BOOLEAN,
        field: 'is_msme',
        defaultValue: false,
    },
    MSMECertificate: {
        type: Sequelize.JSONB,
        field: 'msme_certificate',
    },
    cashLimit: {
        type: Sequelize.DECIMAL(10, 2),
        field: 'cash_limit',
    },
    type: {
        type: Sequelize.TEXT,
        defaultValue: 'external', // external, internal, imported
        trim: true,
    },
    registeredById: {
        type: Sequelize.INTEGER,
        field: 'registered_by_id',
    },
    isSSI: {
        type: Sequelize.BOOLEAN,
        field: 'is_ssi',
        defaultValue: false,
    },
    composition: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    transporter: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    ssiValidity: {
        type: Sequelize.DATE,
        field: 'ssi_validity',
    },
    subContractor: {
        type: Sequelize.BOOLEAN,
        field: 'sub_contractor',
        defaultValue: false,
    },
    vendorType: { // sourcing remark
        type: Sequelize.TEXT,
        field: 'vendor_type',
        trim: true,
    },
    vendorTypeId: {
        type: Sequelize.INTEGER,
        field: 'vendor_type_id',
    },
};
