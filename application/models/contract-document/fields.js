module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    contractId: {
        type: Sequelize.INTEGER,
        field: 'contract_id',
    },
    userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
    },
    fileUrl: {
        type: Sequelize.TEXT,
        field: 'file_url',
        trim: true,
    },
    fileName: {
        type: Sequelize.TEXT,
        field: 'file_name',
        trim: true,
    },
    type: {
        type: Sequelize.TEXT, // 'other'
        defaultValue: 'other',
        trim: true,
    },
    belongsTo: {
        type: Sequelize.TEXT, // sourcing , vendor, co_sourcing
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