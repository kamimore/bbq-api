module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    parentId: {
        type: Sequelize.INTEGER,
        field: 'parent_id',
        defaultValue: 0,
    },
    content: {
        type: Sequelize.TEXT,
        trim: true,
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        field: 'is_deleted',
        defaultValue: false,
    },
    isSpecial: {
        type: Sequelize.BOOLEAN,
        field: 'is_special',
        defaultValue: false,
    },
};
