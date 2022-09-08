
const boom = require('@hapi/boom');
const model = require('./model');

const logger = require('../../../../engine/logger');

module.exports.get = async (req, h) => {
    try {
        const tasks = await model.get();

        return h.response(tasks).code(200);
    } catch (err) {
        logger.error(err.message);

        return boom.internal();
    }
};

module.exports.create = async (request, h) => {
    try {
        const task = request.payload;

        const newTask = await model.create(task);

        return h.response(newTask).code(200);
    } catch (err) {
        logger.error(err.message);

        return boom.internal();
    }
};

module.exports.update = async (request, h) => {
    try {
        const { taskId } = request.params;
        const task = request.payload;

        await model.update(taskId, task);

        return h.response().code(204);
    } catch (err) {
        logger.error(err.message);

        return boom.internal();
    }
};

module.exports.delete = async (request, h) => {
    try {
        const { taskId } = request.params;

        await model.delete(taskId);

        return h.response().code(204);
    } catch (err) {
        logger.error(err.message);

        return boom.internal();
    }
};
