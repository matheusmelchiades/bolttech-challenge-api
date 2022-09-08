/** @type {import('../../../../engine/dao/handlers/Postgres')} */
const db = global.databases.postgres;
const { 'v4': uuidV4 } = require('uuid');

const query = require('./query');

const { fromDB } = require('./mappers');

module.exports.get = async () => {
    const findQuery = query.find();

    const results = await db.query(findQuery.text, findQuery.values);

    return results || [];
};

module.exports.create = async task => {

    try {
        await db.startTransaction();

        const createQuery = query.create({
            'id': uuidV4(),
            ...task
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

module.exports.update = async (id, task) => {

    try {
        await db.startTransaction();

        const updateQuery = query.update(id, task);

        const result = await db.transactionQuery(updateQuery.text, updateQuery.values);

        await db.transactionCommit();

        return fromDB(result);
    } catch (err) {
        await db.transactionRollback();
        throw err;
    } finally {
        await db.transactionRelease();
    }
};

module.exports.delete = async id => {

    try {
        await db.startTransaction();

        const deleteQuery = query.delete(id);

        const result = await db.transactionQuery(deleteQuery.text, deleteQuery.values);

        await db.transactionCommit();

        return result;
    } catch (err) {
        await db.transactionRollback();
        throw err;
    } finally {
        await db.transactionRelease();
    }
};
