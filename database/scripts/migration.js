require('dotenv').config();

const { migrate } = require('postgres-migrations');

(async function() {
    const dbConfig = {
        'database': process.env.POSTGRES_DATABASE,
        'user': process.env.POSTGRES_USERNAME,
        'password': process.env.POSTGRES_PASSWORD,
        'host': process.env.POSTGRES_HOST,
        'port': Number(process.env.POSTGRES_PORT),
        'ensureDatabaseExists': false,
        'defaultDatabase': process.env.POSTGRES_GLOBAL_NAME || 'postgrest'
    };

    await migrate(dbConfig, `${__dirname}/../migrations`);
}());

