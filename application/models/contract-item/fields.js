module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    contractId: {
        type: Sequelize.INTEGER,
        field: 'contract_id',
        allowNull: false,
    },
    itemId: {
        type: Sequelize.INTEGER,
        field: 'item_id',
    },
    itemName: {
        type: Sequelize.TEXT,
        field: 'item_name',
        trim: true,
    },
    currentPrice: {
        type: Sequelize.DECIMAL(10, 3),
        field: 'current_price',
        defaultValue: 0,
    },
    newPrice: {
        type: Sequelize.DECIMAL(10, 3),
        field: 'new_price',
        defaultValue: 0,
    },
    vendorPrice: {
        type: Sequelize.DECIMAL(10, 3),
        field: 'vendor_price',
        defaultValue: 0,
    },
    finalPrice: {
        type: Sequelize.DECIMAL(10, 3),
        field: 'final_price',
        defaultValue: 0,
    },
    tax: {
        type: Sequelize.DECIMAL(10, 3),
        defaultValue: 0,
    },
    brand: {
        type: Sequelize.TEXT,
        trim: true,
    },
    specification: {
        type: Sequelize.TEXT,
        trim: true,
    },
    imageName: {
        type: Sequelize.TEXT,
        field: 'image_name',
        allowNull: true
    },
    imageUrl: {
        type: Sequelize.TEXT,
        field: 'image_url',
        allowNull: true
    }
};