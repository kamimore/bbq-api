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
    contactPersonName: {
        type: Sequelize.TEXT,
        field: 'contact_person_name',
        defaultValue: '',
        trim: true,
    },
    email: {
        type: Sequelize.TEXT,
        // validate: {
        //     isEmail: true
        // },
        trim: true,
    },
    address: {
        type: Sequelize.TEXT,
        trim: true,
    },
    address2: {
        type: Sequelize.TEXT,
        field: 'address_2',
        trim: true,
    },
    city: {
        type: Sequelize.TEXT,
        trim: true,
    },
    stateId: {
        type: Sequelize.INTEGER,
        field: 'state_id',
    },
    country: {
        type: Sequelize.TEXT,
        trim: true,
        defaultValue: 'India',
    },
    postCode: {
        type: Sequelize.TEXT,
        field: 'post_code',
        trim: true,
    },
    landlineNumber: {
        type: Sequelize.TEXT,
        field: 'landline_number',
        trim: true,
    },
    phoneNumber: {
        type: Sequelize.TEXT,
        field: 'phone_number',
        trim: true,
    },
    fax: {
        type: Sequelize.TEXT,
        trim: true,
    },
    isPANAvailable: {
        type: Sequelize.BOOLEAN,
        field: 'is_pan_available',
        defaultValue: false,
    },
    panNumber: {
        type: Sequelize.TEXT,
        field: 'pan_number',
        trim: true,
    },
    tinNumber: {
        type: Sequelize.TEXT,
        field: 'tin_number',
        trim: true,
    },
    taxLiable: {
        type: Sequelize.BOOLEAN,
        field: 'tax_liable',
        defaultValue: false,
    },
    taxLiableCode: {
        type: Sequelize.TEXT,
        field: 'tax_liable_code',
        trim: true,
    },
    gstVendorType: {
        type: Sequelize.TEXT,
        field: 'gst_vendor_type',
        defaultValue: 'not_registered',
        trim: true,
    },
    gstNumber: {
        type: Sequelize.TEXT,
        field: 'gst_number',
        trim: true,
    },
    fssaiNumber: {
        type: Sequelize.TEXT,
        field: 'fssai_number',
        trim: true,
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        field: 'is_deleted',
        defaultValue: false,
    },
    fssaiValidTill: {
        type: Sequelize.DATE,
        field: 'fssai_valid_till',
    }
};
