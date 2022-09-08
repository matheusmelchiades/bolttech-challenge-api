const glob = require('glob');
const chalk = require('chalk');

const globOptions = {
    'nodir': true,
    'strict': true
};

const OPTONS_DEFAULT = {
    'paths': []
};

function register(server, options = OPTONS_DEFAULT) {

    const promises = options.paths
        .map(skts => glob.sync(skts, globOptions))
        .flat()
        .map(filePath => {

            try {

                // eslint-disable-next-line global-require
                const strategy = require(filePath);

                return strategy(server);
            } catch (err) {

                server.log(['error'], `PATH: ${chalk.red(filePath)}`);
                server.log(['error'], `ERROR: ${chalk.red(err.message)}`);

                return Promise.resolve({});
            }
        });


    return Promise.all(promises);
}

module.exports = {
    'name': 'Auth',
    'version': '1.0.0',
    register
};
