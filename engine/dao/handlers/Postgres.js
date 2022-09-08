const { Pool } = require('pg');

function Postgres(config = {}) {
    this.config = config;
    this.pool = new Pool(config);
}

Postgres.prototype.open = async function() {
    const db = await this.pool.connect();

    try {
        const { rows } = await db.query('SELECT NOW()');

        if (!rows.length) throw new Error('Error on connect to postgres');

    } catch (err) {
        throw new this.Error(err.message);
    } finally {
        db.release();
    }
};

Postgres.prototype.errors = {
    'ERROR_IN_CONSTRAINT': 'ERROR_IN_CONSTRAINT',
    'POSTGRES_ERROR': 'POSTGRES_ERROR'
};

Postgres.prototype.Error = function(message, name = 'POSTGRES_ERROR') {
    const instance = new Error(message);

    instance.name = name;

    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));

    if (Error.captureStackTrace) {
        Error.captureStackTrace(instance, this.PG_ERROR);
    }

    return instance;
};

/**
 * Send new query to database.
 * @param {string | object} query The SQL query.
 * @returns {Promise} Return promise query result.
 */
Postgres.prototype.query = async function(query) {
    const client = await this.pool.connect();

    try {
        const { rows } = await client.query(query);

        return rows;
    } catch (err) {
        if (err.constraint) {
            throw this.Error(err.message, this.errors.ERROR_IN_CONSTRAINT);
        }

        throw new this.Error(err.message);
    } finally {
        client.release();
    }
};

module.exports = Postgres;
