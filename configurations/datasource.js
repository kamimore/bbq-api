/**
 @author: Pulkit chadha
 configuration is define to make connection with the database for the different environment.
*/

// function to check connection to database server
function checkConnection(db) {
    console.log('inside the checkConnection', db)
    db.authenticate().then(() => {
        console.log('db connected')
        Logger.info('Successfully connected to database.');
    }).catch((err) => {
        console.log('db not connected')
        Logger.error('Could not connect to database!', err);
    });
    console.log("end of checkConnection")
}

module.exports = () => {
    const options = {
        logging: process.env.ENABLE_DB_LOG === 'true',
        dialect: 'postgres',
        sync: process.env.DB_SYNC === 'true',
        timezone: 'utc',
        pool: {
            max: 10,
            min: 0,
            idle: 20000,
            // acquire: 20000
        },
        dialectOptions: {
            ssl: false,
            useUTC: true,
        },
        define: {
            underscored: true,
            timestamps: true,
        },
    };

    const url = process.env.DATABASE_URL;
    const db = new Sequelize(url, options);
    checkConnection(db);

    // sychonize tables
    if (process.env.DB_SYNC === 'true') {
        const option = process.env.DB_SYNC_APPEND ? {
            append: true
        } : {};
        db.sync(option);
    }
    return db;
};
