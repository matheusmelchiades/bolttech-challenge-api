const good = require('@hapi/good');
const inert = require('@hapi/inert');
const vision = require('@hapi/vision');
const authBasic = require('@hapi/basic');
const authJWT = require('hapi-auth-jwt2');


const loggerConfig = require('../../config/logger');

// PLUGINS
const routes = require('./routes');
const socket = require('./socket');
const auth = require('./auth');

function getPlugins() {
    const plugins = [];

    // DEPENDENCIES
    plugins.push(inert);
    plugins.push(vision);
    plugins.push(authBasic);
    plugins.push(authJWT);


    // LOGGER
    plugins.push({
        'plugin': good,
        'options': loggerConfig.loggerOptions
    });


    // AUTH
    plugins.push({
        'plugin': auth,
        'options': {
            'paths': [
                `${process.cwd()}/app/api/authentication/simple/strategy.js`,
                `${process.cwd()}/app/api/authentication/jwt/strategy.js`
            ]
        }
    });

    // ROUTES
    plugins.push({
        'plugin': routes,
        'options': {
            'routes': [`${process.cwd()}/app/api/components/**/*routes.js`]
        }
    });

    // SOCKET
    plugins.push({
        'plugin': socket,
        'options': {
            'sockets': [`${process.cwd()}/app/api/services/sockets/**`]
        }
    });

    return plugins;
}

module.exports = server => {
    const AllPlugins = getPlugins();

    const promises = AllPlugins.map(plugin => server.register(plugin));

    return Promise.all(promises);
};
