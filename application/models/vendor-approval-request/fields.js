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
    superCategoryId: { // food, non_food, beverages
        type: Sequelize.INTEGER,
        field: 'super_category_id',
    },
    assignedToId: {
        type: Sequelize.INTEGER,
        field: 'assigned_to_id',
    },
    assignedById: {
        type: Sequelize.INTEGER,
        field: 'assigned_by_id',
    },
    reviewedDate: {
        type: Sequelize.DATE,
        field: 'reviewed_date',
    },
    status: {
        type: Sequelize.TEXT, // pending, approved, rejected ,assigned_to_other
        defaultValue: 'pending',
        trim: true,
    },
    comment: {
        type: Sequelize.TEXT,
        trim: true,
    },
};
