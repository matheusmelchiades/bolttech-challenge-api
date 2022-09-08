const bunyan = require('bunyan');
const config = require('../config/logger');
const fs = require('fs');

let rotatingLogger = null;

const noTest = process.env.NODE_ENV !== 'test';
const noDevelopment = process.env.NODE_ENV !== 'development';

function logger() {
    // Create log folder
    if (noTest && noDevelopment && !fs.existsSync(config.core_logging.folder)) {
        fs.mkdirSync(config.core_logging.folder);
    }

    if (!rotatingLogger) rotatingLogger = bunyan.createLogger(config.core_logging.options);

    if (process.env.NODE_ENV === 'test') rotatingLogger.level(bunyan.FATAL + 1);

    return rotatingLogger;
}

module.exports = logger();
