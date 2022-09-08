require('dotenv').config();

module.exports = {
    [process.env.POSTGRES_GLOBAL_NAME]: {
        'type': 'postgres',
        'logTag': process.env.POSTGRES_LOG_TAG,
        'credentials': {
            'host': process.env.POSTGRES_HOST,
            'port': process.env.POSTGRES_PORT,
            'user': process.env.POSTGRES_USERNAME,
            'password': process.env.POSTGRES_PASSWORD,
            'database': process.env.POSTGRES_DATABASE,
            'uri': process.env.POSTGRES_URI
        }
    }
};
