const logger = require('../../../../engine/logger');

module.exports.test = ({ socket }) => {

    try {

        socket.emit('receiveTest', {
            'response': 'test success'
        });

    } catch (err) {
        logger.error(err.message);

        return err;
    }
};
