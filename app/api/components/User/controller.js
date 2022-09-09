
const boom = require('@hapi/boom');
const model = require('./model');

const logger = require('../../../../engine/logger');

const helper = require('../../../../helper/crypto');

const authToken = require('../../authentication/jwt/generate');

module.exports.create = async (req, h) => {
    try {
        const { username, password } = req.payload;

        const hash = await helper.encrypt(password);

        const user = await model.findByName(username);

        if (user) throw boom.conflict('User already exists!');

        const newUser = await model.create({
            'name': username,
            'password': hash
        });

        return h.response(newUser).code(200);
    } catch (err) {
        logger.error(err.message);

        if (boom.isBoom(err)) return err;

        return boom.internal();
    }
};

module.exports.signIn = async (r, h) => {
    try {
        const user = r.auth.credentials;

        const token = await authToken.generate(user);

        return h.response({ token, user }).code(200);
    } catch (err) {
        logger.error(err.message);

        if (boom.isBoom(err)) return err;

        return boom.internal();
    }
};
