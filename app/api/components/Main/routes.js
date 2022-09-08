module.exports = [
    {
        'path': '/',
        'method': 'GET',
        'handler': () => ({ 'status': 'running' }),
        'config': {
            'description': 'Get Default'
        }
    }
];
