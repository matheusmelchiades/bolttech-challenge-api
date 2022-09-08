
const jwt = require('jsonwebtoken');

const securityConfig = require('../../../../config/security');

module.exports.generate = data => {
    return jwt.sign({ data }, securityConfig.key, securityConfig.setupToken);
};
