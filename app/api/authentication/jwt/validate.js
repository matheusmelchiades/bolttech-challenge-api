const { TokenExpiredError } = require('jsonwebtoken');
const { TokenInvalid } = require('./errors');

function isValid(flag = true) {

    return {
        'isValid': flag
    };
}

module.exports = (decoded, throwError = true) => {
    try {
        if (decoded.iat < decoded.exp) isValid(false);

        const { 'data': user } = decoded;

        if (!user.id || !user.name) return isValid(false);

        return isValid();
    } catch (err) {
        if (err instanceof TokenExpiredError && throwError) throw new TokenInvalid();

        throw err;
    }

};
