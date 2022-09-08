const TABLE = 'tasks';

module.exports.find = () => {
    return {
        'text': `
            SELECT * FROM ${TABLE};
        `,
        'values': []
    };
};

module.exports.create = task => {

    return {
        'text': `
            INSERT INTO ${TABLE} (id, content, is_done, project_id, created_at, due_at) values ($1, $2, $3, $4, $5, $6) RETURNING *;
        `,
        'values': [
            task.id,
            task.content || '',
            task.isDone || false,
            task.projectId,
            task.createdAt || new Date().toISOString(),
            task.dueAt
        ]
    };
};

module.exports.update = (id, { content, isDone, dueAt }) => {

    return {
        'text': `
            UPDATE 
                ${TABLE}
            SET
                content = $2,
                is_done = $3,
                due_at = $4
            WHERE
                id = $1
        `,
        'values': [id, content, isDone, dueAt]
    };
};

module.exports.delete = id => {

    return {
        'text': `
            DELETE FROM
                ${TABLE}
            WHERE id = $1;
        `,
        'values': [id]
    };
};
