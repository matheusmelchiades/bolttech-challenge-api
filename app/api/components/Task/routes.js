const handler = require('./controller');
const joi = require('@hapi/joi');


module.exports = [
    {
        'path': '/tasks',
        'method': 'GET',
        'handler': handler.get,
        'config': {
            'description': 'Get Tasks',
            'auth': 'jwt'
        }
    },
    {
        'path': '/tasks',
        'method': 'POST',
        'handler': handler.create,
        'config': {
            'description': 'Create Tasks',
            'auth': 'jwt',
            'validate': {
                'payload': joi.object().keys({
                    'content': joi.string().min(3).required(),
                    'dueAt': joi.string().isoDate().required(),
                    'projectId': joi.string().uuid().required()
                })
            }
        }
    },
    {
        'path': '/tasks/{taskId}',
        'method': 'PUT',
        'handler': handler.update,
        'config': {
            'description': 'Update Tasks',
            'auth': 'jwt',
            'validate': {
                'params': joi.object().keys({
                    'taskId': joi.string().uuid().required()
                }),
                'payload': joi.object().keys({
                    'content': joi.string().min(3).required(),
                    'dueAt': joi.string().isoDate().required(),
                    'isDone': joi.boolean().required()
                })
            }
        }
    },
    {
        'path': '/tasks/{taskId}',
        'method': 'DELETE',
        'handler': handler.delete,
        'config': {
            'description': 'Delete Tasks',
            'auth': 'jwt',
            'validate': {
                'params': joi.object().keys({
                    'taskId': joi.string().uuid().required()
                })
            }
        }
    }
];
