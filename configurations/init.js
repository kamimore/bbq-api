// default enviornment.
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Sentry
require('./sentry');

global.requireDirectory = require('../utilities/require-directory');
global.Joi = require('joi');
global.path = require('path');
global.fs = require('fs');
const util = require('util');

global.promisify = util.promisify;
global.Logger = require('../utilities/logger-utility');

// global variable to hold all the environment specific configuration
global.configHolder = {};

// Application specific configuration details
configHolder.config = require('./conf.js')();

// Database dependencies and Connection setting
global.Sequelize = require('sequelize');
global.SequelizeConnect = require('./datasource.js')();
global.domain = require('../application/models');

// UTILITY CLASSES
configHolder.emailUtil = require('../utilities/email-utility');
configHolder.messages = require('./application-messages');
configHolder.encrypt = require('../utilities/encryption-utility');
configHolder.responseHandler = require('../utilities/response-handler');
configHolder.requestUtility = require('../utilities/request-utility');

module.exports = configHolder;
