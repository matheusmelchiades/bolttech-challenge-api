const logger = require('../../../../engine/logger');

const validate = require('./validate');

module.exports = server => {

    try {
        server.auth.strategy('simple', 'basic', { validate });

        logger.info('Basic authentication initialized');

    } catch (err) {
        logger.info('### Error on initialize Basic authentication ###');
    }
};
