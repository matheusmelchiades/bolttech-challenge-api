require('dotenv').config();

module.exports = {
    'host': process.env.HOST || '0.0.0.0',
    'port': process.env.PORT || 5000,
    'routes': {
        'cors': {
            'origin': ['*']
        }
    }
};
