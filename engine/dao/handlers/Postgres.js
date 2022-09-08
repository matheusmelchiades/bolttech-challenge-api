const { Pool, types } = require('pg');
const format = require('pg-format');

function Postgres(config = {}) {
    this.config = config;
    this.pool = new Pool(config);
    this.transaction = null;
    this.pgFormat = ['%I', '%L', '%s'];

    types.setTypeParser(20, parseInt);
}

function isFormatedQuery(query) {
    return this.pgFormat.some(fm => query.includes(fm));
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

Postgres.prototype.isDuplicateError = function(err, field) {

    if (err.message.includes('duplicate key value violates unique constraint')) {

        if (field) {
            if (err.message.includes(field)) return true;

            return false;
        }

        return true;
    }

    return false;
};


/**
 * Send new query to database.
 * @param {string | object} query The SQL query.
 * @param {string | object} values The SQL query.
 * @returns {Promise} Return promise query result.
 */
Postgres.prototype.query = async function(query, values, ...params) {
    const client = await this.pool.connect();

    try {
        if (isFormatedQuery.call(this, query, values)) {
            const { rows } = await this.transaction.query(format(query, values), ...params);

            return rows;
        }

        const { rows } = await client.query(query, values, ...params);

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

Postgres.prototype.startTransaction = async function() {
    this.transaction = await this.pool.connect();

    try {
        await this.transaction.query('BEGIN');
    } catch (err) {
        this.transaction.query('ROLLBACK');
        this.transaction.release();
    }
};

Postgres.prototype.transactionQuery = async function(query, values, ...params) {

    try {
        if (isFormatedQuery.call(this, query, values)) {
            const { rows } = await this.transaction.query(format(query, values), ...params);

            return rows;
        }

        const { rows } = await this.transaction.query(query, values, ...params);

        return rows;
    } catch (err) {
        if (err.constraint) {
            throw this.Error(err.message, this.errors.ERROR_IN_CONSTRAINT);
        }

        throw new this.Error(err.message);
    }
};

Postgres.prototype.transactionCommit = function() {
    return this.transaction.query('COMMIT');
};

Postgres.prototype.transactionRollback = function() {
    return this.transaction.query('ROLLBACK');
};

Postgres.prototype.transactionRelease = function() {
    return this.transaction.release();
};

module.exports = Postgres;
