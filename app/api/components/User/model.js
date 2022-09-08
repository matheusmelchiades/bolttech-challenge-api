/** @type {import('../../../../engine/dao/handlers/Postgres')} */
const db = global.databases ? global.databases.postgres : {};
const { 'v4': uuidV4 } = require('uuid');

const query = require('./query');

const { fromDB } = require('./mappers');

module.exports.findByName = async name => {
    const findByNameQuery = query.findByName(name);

    const [result] = await db.query(findByNameQuery.text, findByNameQuery.values);

    return result || null;
};

module.exports.create = async user => {

    try {
        await db.startTransaction();

        const createQuery = query.create({
            'id': uuidV4(),
            ...user
        });

        const [result] = await db.transactionQuery(createQuery.text, createQuery.values);

        await db.transactionCommit();

        return fromDB(result);
    } catch (err) {
        await db.transactionRollback();
        throw err;
    } finally {
        await db.transactionRelease();
    }
};
