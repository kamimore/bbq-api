module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    vendorId: {
        type: Sequelize.INTEGER,
        field: 'vendor_id',
        allowNull: false,
    },
    createdBy: {
        type: Sequelize.INTEGER,
        field: 'created_by',
        allowNull: true,
    },
    // categoryId: {
    //     type: Sequelize.INTEGER,
    //     field: 'category_id',
    //     allowNull: true,
    // },
    fromDate: {
        type: Sequelize.DATE,
        field: 'from_date',
        allowNull: false,
    },
    toDate: {
        type: Sequelize.DATE,
        field: 'to_date',
        allowNull: false,
    },
    termCondition: {
        type: Sequelize.TEXT,
        field: 'term_condition',
        trim: true,
    },
    bbqComment: {
        type: Sequelize.TEXT,
        field: 'bbq_comment',
        allowNull: true,
        trim: true,
    },
    vendorComment: {
        type: Sequelize.TEXT,
        field: 'vendor_comment',
        allowNull: true,
        trim: true,
    },
    paymentTermId: {
        type: Sequelize.INTEGER,
        field: 'payment_term_id',
    },
    contractType: {
        type: Sequelize.TEXT,
        field: 'contract_type',
        allowNull: false, // recurring, one_time
        defaultValue: 'recurring',
    },
    contractService: {
        type: Sequelize.TEXT,
        field: 'contract_service',
        allowNull: false, // supply, service
        defaultValue: 'supply',
    },
    /**
     * draft, sent_to_vendor, change_request, 
     * rejected_by_vendor, rejected_by_sourcing, 
     * sent_to_co_sourcing, rejected_by_co_sourcing,
     * approved
     */
    status: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: 'draft',
    },
    type: {
        type: Sequelize.TEXT,
        field: 'type',
        defaultValue: 'internal', // internal, imported
    },
    deliveryTerm: {
        type: Sequelize.TEXT,
        field: 'delivery_term',
    },
    advancePayment: {
        type: Sequelize.TEXT,
        field: 'advance_payment',
    },
    isContractOverrided: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        field: 'is_contract_overrided'
    },
    overrideStatus: {
        type: Sequelize.TEXT,
        field: 'override_status'
    },
    /**
     * override, override_approved_by_co_sourcing,
     * override_rejected_by_co_sourcing, override_approved_by_vendor,
     * override_rejected_by_vendor
     */
};
