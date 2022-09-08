const Mongo = require('./Mongo');
const Postgres = require('./Postgres');

module.exports = {
    'mongodb': Mongo,
    'postgres': Postgres
};
