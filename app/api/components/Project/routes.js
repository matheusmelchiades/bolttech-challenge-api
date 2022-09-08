const handler = require('./controller');
const joi = require('@hapi/joi');


module.exports = [
    {
        'path': '/projects',
        'method': 'GET',
        'handler': handler.get,
        'config': {
            'description': 'Get projects',
            'auth': 'jwt'
        }
    },
    {
        'path': '/projects',
        'method': 'POST',
        'handler': handler.create,
        'config': {
            'description': 'Create projects',
            'auth': 'jwt',
            'validate': {
                'payload': joi.object().keys({
                    'name': joi.string().min(3).required()
                })
            }
        }
    },
    {
        'path': '/projects/{projectId}',
        'method': 'PUT',
        'handler': handler.update,
        'config': {
            'description': 'Update projects',
            'auth': 'jwt',
            'validate': {
                'params': joi.object().keys({
                    'projectId': joi.string().uuid().required()
                }),
                'payload': joi.object().keys({
                    'name': joi.string().min(3).required()
                })
            }
        }
    },
    {
        'path': '/projects/{projectId}',
        'method': 'DELETE',
        'handler': handler.delete,
        'config': {
            'description': 'Delete projects',
            'auth': 'jwt',
            'validate': {
                'params': joi.object().keys({
                    'projectId': joi.string().uuid().required()
                })
            }
        }
    },
    {
        'path': '/projects/tasks',
        'method': 'GET',
        'handler': handler.getTasksByProject,
        'config': {
            'description': 'Get tasks by project',
            'auth': 'jwt'
        }
    }

];
