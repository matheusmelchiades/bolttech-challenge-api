
class TokenInvalid extends Error {

    constructor(message = 'Token inválido!', ...args) {
        super(message, ...args);
        this.message = message;
    }
}

module.exports = { TokenInvalid };
