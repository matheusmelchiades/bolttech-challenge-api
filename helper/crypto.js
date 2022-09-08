const bcrypt = require('bcrypt');

const config = require('../config/security');

module.exports.encrypt = (data = '') => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(config.passwordSalt, (err, salt) => {
            if (err) return reject(err);
            bcrypt.hash(data, salt, (err, hash) => {
                if (err) return reject(err);

                return resolve(hash);
            });
        });
    });
};

module.exports.check = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, result) => {
            if (err) return reject(err);

            return resolve(result);
        });
    });
};
