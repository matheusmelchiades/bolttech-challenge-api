const userModel = require('../../components/User/model');
const crypto = require('../../../../helper/crypto');

module.exports = async (_, username, password) => {
    const user = await userModel.findByName(username);

    if (!user) return { 'credentials': null, 'isValid': false };

    const isValid = await crypto.check(password, user.password);

    const credentials = { 'id': user.id, 'name': user.name };

    return { isValid, credentials };
};
