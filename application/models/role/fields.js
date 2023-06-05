module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    label: {
        type: Sequelize.TEXT,
        unique: true,
        allowNull: false,
        trim: true,
    },
    name: {
        type: Sequelize.TEXT, // 'superadmin', 'bd', 'vendor', 'erp_user'
        unique: true,
        allowNull: false,
        trim: true,
    },
    permission: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        defaultValue: [],
    },
};
