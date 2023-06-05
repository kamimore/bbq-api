module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        allowNull: false,
    },
    message: {
        type: Sequelize.TEXT,
        field: 'message',
        trim: true,
    },
    title: {
        type: Sequelize.TEXT,
        field: 'title',
        trim: true,
    },
    payload: {
        type: Sequelize.JSONB,
        field: 'payload',
    },
    hasRead: {
        type: Sequelize.BOOLEAN,
        field: 'has_read',
        defaultValue: false,
    },
    type: {
        type: Sequelize.TEXT, // vendor_registered, survey_created, survey_assigned, survey_note_created, other
        defaultValue: 'other',
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        field: 'is_deleted',
        defaultValue: false,
    },
};
