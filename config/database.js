require('dotenv').config();

module.exports = {
    [process.env.MONGO_GLOBAL_NAME]: {
        'type': 'mongodb',
        'logTag': process.env.MONGO_LOG_TAG,
        'credentials': {
            'host': process.env.MONGO_HOST,
            'port': process.env.MONGO_PORT,
            'user': process.env.MONGO_USERNAME,
            'password': process.env.MONGO_PASSWORD,
            'database': process.env.MONGO_DATABASE,
            'uri': process.env.MONGO_URI
        }
    },
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
