const securityConfig = require('../../../../config/security');
const logger = require('../../../../engine/logger');

const validate = require('./validate');

module.exports = server => {

    try {
        server.auth.strategy(securityConfig.strategy, securityConfig.strategy, {
            'key': securityConfig.key,
            validate,
            'verifyOptions': {
                'algorithm': securityConfig.algorithm
            }
        });

        server.auth.default('jwt');

        logger.info('JWT authentication initialized');

    } catch (err) {
        logger.info('### Error on initialize JWT authentication ###');
    }
};
