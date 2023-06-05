module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    vendorLocationId: {
        type: Sequelize.INTEGER,
        field: 'vendor_location_id',
    },
    vendorBankDetailId: {
        type: Sequelize.INTEGER,
        field: 'vendor_bank_detail_id',
    },
    fileUrl: {
        type: Sequelize.TEXT,
        field: 'file_url',
    },
    fileName: {
        type: Sequelize.TEXT,
        field: 'file_name',
        trim: true,
    },
    type: {
        type: Sequelize.TEXT, // 'pan', 'cancel_cheque', 'gst_ack_copy', 'other'
        defaultValue: 'other',
        trim: true,
    },
    belongsTo: {
        type: Sequelize.TEXT, // bank , location
        field: 'belongs_to',
        defaultValue: 'location',
        trim: true,
    },
    comment: {
        type: Sequelize.TEXT,
        trim: true,
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        field: 'is_deleted',
        defaultValue: false,
    },
};