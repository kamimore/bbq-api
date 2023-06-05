/*
 * @author Pulkit
 * This program includes all the function which are required to  initialize before the application start
 */

const cluster = require('cluster');
const os = require('os');

// code to start the server Clustering of the Application
function bootApplication() {
    if (cluster.isMaster && process.env.ENABLE_CLUSTERING === 'true') {
        const cpuCount = os.cpus().length;
        // Create a worker for each CPU
        for (let i = 0; i < cpuCount; i += 1) {
            cluster.fork();
        }
    } else {
        app.listen(process.env.PORT, () => {
            /* eslint max-len: 0 */
            Logger.info(`Express server listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode, clustering ${process.env.ENABLE_CLUSTERING}`);
        });
    }

    process.on('uncaughtException', (err) => {
        Logger.error(`${(new Date()).toUTCString()} uncaughtException:`, err.message);
        Logger.error(err.stack);
        process.exit(1);
    });
}

const initApp = () => {
    bootApplication();
};

module.exports.initApp = initApp;
