
const boom = require('@hapi/boom');
const model = require('./model');

const logger = require('../../../../engine/logger');

module.exports.get = async (req, h) => {
    try {
        const projects = await model.get();

        return h.response(projects).code(200);
    } catch (err) {
        logger.error(err.message);

        return boom.internal();
    }
};

module.exports.create = async (request, h) => {
    try {
        const { 'data': user } = request.auth.credentials;

        const project = request.payload;

        const newProject = await model.create({
            ...project,
            'userId': user.id
        });

        return h.response(newProject).code(200);
    } catch (err) {
        logger.error(err.message);

        return boom.internal();
    }
};

module.exports.update = async (request, h) => {
    try {
        const { projectId } = request.params;
        const project = request.payload;

        await model.update(projectId, project);

        return h.response().code(204);
    } catch (err) {
        logger.error(err.message);

        return boom.internal();
    }
};

module.exports.delete = async (request, h) => {
    try {
        const { projectId } = request.params;

        await model.delete(projectId);

        return h.response().code(204);
    } catch (err) {
        logger.error(err.message);

        return boom.internal();
    }
};


module.exports.getTasksByProject = async (req, h) => {
    try {
        const { 'data': user } = req.auth.credentials;
        const projects = await model.getProjectsAndTasks(user);

        return h.response(projects).code(200);
    } catch (err) {
        logger.error(err.message);

        return boom.internal();
    }
};
