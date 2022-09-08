module.exports = {
    'strategy': 'jwt',
    'passwordSalt': 10,
    'key': 'secret-key',
    'setupToken': {
        'expiresIn': '1h',
        'algorithm': 'HS256'
    }
};
