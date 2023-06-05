module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    questionCategoryId: {
        type: Sequelize.INTEGER,
        field: 'question_category_id',
        allowNull: false,
    },
    label: {
        type: Sequelize.TEXT,
        trim: true,
    },
    helpText: {
        type: Sequelize.TEXT,
        field: 'help_text',
        trim: true,
    },
    // values: [
    //     'text','textarea', 'number', 'phone',
    //     'image', 'video', 'email', 'dimension',
    //     'radio', 'checkbox', 'select', 'rating',
    //     'date', 'time', 'date_time', 'date_range',
    //     'year', 'month', 'coordinates', 'address', 'site_coordinates', 'site_address'
    // ],
    answerType: {
        type: Sequelize.TEXT,
        field: 'answer_type',
        defaultValue: 'text',
        allowNull: false,
    },
    multi: {
        type: Sequelize.BOOLEAN,
        field: 'multi',
        defaultValue: false,
    },
    options: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
    },
    order: {
        type: Sequelize.INTEGER,
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        field: 'is_active',
        defaultValue: true,
    },
    isRequired: {
        type: Sequelize.BOOLEAN,
        field: 'is_required',
        defaultValue: false,
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        field: 'is_deleted',
        defaultValue: false,
    },
};
