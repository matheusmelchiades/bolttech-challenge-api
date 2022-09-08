const Socket = require('socket.io');
const glob = require('glob');
const chalk = require('chalk');

const globOptions = {
    'nodir': true,
    'strict': true
};

const OPTONS_DEFAULT = {
    'sockets': []
};

function register(server, options = OPTONS_DEFAULT) {
    const io = new Socket(server.listener);

    server.app.socket = io;

    const sockets = options.sockets
        .map(skts => glob.sync(skts, globOptions))
        .flat()
        .map(filePath => {

            try {

                // eslint-disable-next-line global-require
                const modulesSockets = require(filePath);

                return Object
                    .entries(modulesSockets)
                    .map(([label, action]) => ({ label, action }));

            } catch (err) {

                server.log(['error'], `PATH: ${chalk.red(filePath)}`);
                server.log(['error'], `ERROR: ${chalk.red(err.message)}`);

                return null;
            }
        })
        .filter(skts => Boolean(skts))
        .flat();

    io.on('connect', socket => {

        server.log(['log'], `USER CONNECTED ${JSON.stringify(socket.request.connection._peername)}`);

        sockets.forEach(({ label, action }) => {

            socket.on(label, payload => action({ io, socket, payload }));

        });

        socket.on('disconnect', () => {

            server.log(['log'], `USER DISCONNECTED ${JSON.stringify(socket.request.connection._peername)}`);

            socket.disconnect();
        });
    });
}

module.exports = {
    'name': 'Socket',
    'version': '1.0.0',
    register
};
