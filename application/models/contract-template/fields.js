module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    contractId: {
        type: Sequelize.INTEGER,
        field: 'contract_id',
        allowNull: true,
    },
    templateId: {
        type: Sequelize.INTEGER,
        field: 'template_id',
        allowNull: true,
    }
};
