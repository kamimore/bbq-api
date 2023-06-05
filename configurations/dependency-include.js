/*
 * @author Pulkit chadha
 * Requirement - include all the global variables and module required by the application
 */

global.requireDirectory = require('../utilities/require-directory');
global.Joi = require('joi');
global.path = require('path');
global.fs = require('fs');
const util = require('util');

global.promisify = util.promisify;

global.Logger = require('../utilities/logger-utility');

global.configHolder = {};

// Application specific configuration details
configHolder.config = require('./conf.js')();

// Database dependencies and Connection setting
global.Sequelize = require('sequelize');
global.SequelizeConnect = require('./datasource.js')();
global.domain = require('../application/models');

require('./sentry');

// Application specific intial program to execute when server starts
configHolder.Bootstrap = require('./bootstrap.js');

// UTILITY CLASSES
configHolder.emailUtil = require('../utilities/email-utility');
configHolder.sendgridEmailUtil = require('../utilities/sendgrid-email-utility');
configHolder.gcmNotification = require('../utilities/firebase-notification');
configHolder.messages = require('./application-messages');
configHolder.encrypt = require('../utilities/encryption-utility');
configHolder.responseHandler = require('../utilities/response-handler');
configHolder.requestUtility = require('../utilities/request-utility');
configHolder.smsUtility = require('../utilities/send-sms');

module.exports = configHolder;
