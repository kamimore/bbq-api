module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    vendorLocationId: {
        type: Sequelize.INTEGER,
        field: 'vendor_location_id',
        allowNull: false,
    },
    bankName: {
        type: Sequelize.TEXT,
        field: 'bank_name',
        defaultValue: null,
        trim: true,
    },
    branchName: {
        type: Sequelize.TEXT,
        field: 'branch_name',
        defaultValue: '',
        trim: true,
    },
    accountNumber: {
        type: Sequelize.TEXT,
        field: 'account_number',
        defaultValue: '',
        trim: true,
    },
    accountHolderName: {
        type: Sequelize.TEXT,
        field: 'account_holder_name',
        defaultValue: '',
        trim: true,
    },
    IFSCCode: {
        type: Sequelize.TEXT,
        field: 'IFSC_code',
        defaultValue: '',
        trim: true,
    },
    isPrimary: {
        type: Sequelize.BOOLEAN,
        field: 'is_primary',
        defaultValue: false,
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        field: 'is_deleted',
        defaultValue: false,
    },
    isAccountConfirmed: {
        type: Sequelize.BOOLEAN,
        field: "is_account_confirmed",
        default: false
    }
};
