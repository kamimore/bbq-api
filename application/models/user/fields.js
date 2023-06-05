module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fullName: {
        type: Sequelize.TEXT,
        field: 'full_name',
        trim: true,
    },
    email: {
        type: Sequelize.TEXT,
        // unique: true,
        // validate: {
        //     isEmail: true,
        // },
        trim: true,
    },
    roleId: {
        type: Sequelize.INTEGER,
        field: 'role_id',
        allowNull: true,
        defaultValue: 0,
    },
    password: {
        type: Sequelize.TEXT,
        trim: true,
    },
    tempPassword: {
        type: Sequelize.TEXT,
        field: 'temp_password',
        trim: true,
    },
    salt: {
        type: Sequelize.TEXT,
        trim: true,
    },
    isAccountLocked: {
        type: Sequelize.BOOLEAN,
        field: 'is_account_locked',
        defaultValue: false,
    },
    isEmailVerified: {
        type: Sequelize.BOOLEAN,
        field: 'is_email_verified',
        defaultValue: true,
    },
    device: {
        type: Sequelize.TEXT, // ios, android
        defaultValue: 'android',
        trim: true,
    },
    deviceToken: {
        type: Sequelize.TEXT,
        field: 'device_token',
        trim: true,
    },
    sourcingType: {
        type: Sequelize.TEXT, // sourcing, mdm, coorporate_sourcing
        field: 'sourcing_type',
        defaultValue: null,
        trim: true,
    },
    userType: {
        type: Sequelize.TEXT,
        field: 'user_type',
        defaultValue: 'employee', // employee, vendor
        trim: true,
    },
    // -------------------- bbq and saathi db fields --------------
    employeeCode: {
        type: Sequelize.TEXT,
        field: 'employee_code',
        comment: 'EMPCD in bbq login api, id in saathi user table',
    },
    userName: {
        type: Sequelize.TEXT,
        field: 'user_name',
        trim: true,
        comment: 'UserName in bbq login api',
    },
    phone: {
        type: Sequelize.TEXT,
        comment: 'Mobile in bbq login api',
        trim: true,
    },
    dob: {
        type: Sequelize.DATE,
        comment: 'BIRTHDT in bbq login api',
    },
    joiningDate: {
        type: Sequelize.DATE,
        field: 'joining_date',
        comment: 'JOINDT in bbq login api',
    },
    // companyCode: {
    //     type: Sequelize.TEXT,
    //     field: 'company_code',
    //     comment: 'ROLLCD in bbq login api'
    // },
    // locationCode: {
    //     type: Sequelize.TEXT,
    //     field: 'location_code',
    //     comment: 'LocationCode in bbq login api'
    // },
    // cluster: {
    //     type: Sequelize.TEXT,
    //     comment: 'Cluster in bbq login api'
    // },
    // region: {
    //     type: Sequelize.TEXT,
    //     comment : 'Region in bbq login api'
    // },
    // location: {
    //     type: Sequelize.TEXT,
    //     comment : 'Location in bbq login api'
    // },
    //------------------------------------------------------------------
};
