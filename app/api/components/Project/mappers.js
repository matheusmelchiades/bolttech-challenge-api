module.exports.fromDB = projectDb => {

    return {
        'id': projectDb.id,
        'name': projectDb.name,
        'userId': projectDb.user_id
    };
};
