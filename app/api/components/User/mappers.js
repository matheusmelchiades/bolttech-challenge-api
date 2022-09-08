module.exports.fromDB = userDb => {

    return {
        'id': userDb.id,
        'name': userDb.name
    };
};
