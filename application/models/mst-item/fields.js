module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    code: {
        type: Sequelize.TEXT,
        trim: true,
    },
    name: {
        type: Sequelize.TEXT,
        trim: true,
    },
    unit: {
        type: Sequelize.TEXT,
        trim: true,
    },
    productGroupId: {
        type: Sequelize.INTEGER,
        field: 'product_group_id',
    },
    tax: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
    },
};