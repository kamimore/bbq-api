// default enviornment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log('NODE_ENV', process.env.NODE_ENV);

global.express = require('express');

global.app = express();
global.router = express.Router();

global.BASE_PATH = __dirname;

global.configHolder = require('./configurations/dependency-include.js');

require('./middlewares/app-middlewares');

require('./configurations/layers/index')(__dirname);

app.get('/', (req, res) => res.status(200).send('Service is running'));

configHolder.Bootstrap.initApp();
