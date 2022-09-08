const TABLE = 'users';

module.exports.findByName = name => {
    return {
        'text': `
            SELECT * FROM ${TABLE} WHERE UPPER(name) like  UPPER($1);
        `,
        'values': [name]
    };
};

module.exports.create = task => {

    return {
        'text': `
            INSERT INTO ${TABLE} (id, name, password) values ($1, $2, $3) RETURNING *;
        `,
        'values': [
            task.id,
            task.name || '',
            task.password || ''
        ]
    };
};
