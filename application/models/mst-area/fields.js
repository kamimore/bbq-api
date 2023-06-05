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
    regionId: {
        type: Sequelize.INTEGER,
        field: 'region_id',
    },
    stateId: {
        type: Sequelize.INTEGER,
        field: 'state_id',
    },
    cityId: {
        type: Sequelize.INTEGER,
        field: 'city_id',
    },
    address1: {
        type: Sequelize.TEXT,
        field: 'address_1',
        trim: true,
    },
    address2: {
        type: Sequelize.TEXT,
        field: 'address_2',
        trim: true,
    },
    postCode: {
        type: Sequelize.TEXT,
        field: 'post_code',
        trim: true,
    },
};
