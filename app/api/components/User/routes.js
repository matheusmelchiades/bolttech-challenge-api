const joi = require('@hapi/joi');

const handler = require('./controller');

module.exports = [
  {
    'path': '/users',
    'method': 'POST',
    'handler': handler.create,
    'config': {
      'description': 'create Tasks',
      'validate': {
        'payload': joi.object().keys({
          'username': joi.string().required(),
          'password': joi.string().min(3).required()
        })
      }
    }
  },
  {
    'path': '/signin',
    'method': 'POST',
    'handler': handler.signIn,
    'config': {
      'description': 'SIGN IN',
      'auth': 'simple'
    }
  }
];
