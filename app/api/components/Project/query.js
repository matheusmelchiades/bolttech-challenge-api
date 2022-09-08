const TABLE = 'projects';

module.exports.find = () => {
    return {
        'text': `
            SELECT * FROM ${TABLE};
        `,
        'values': []
    };
};

module.exports.create = project => {

    return {
        'text': `
            INSERT INTO ${TABLE} (id, name, user_id) values ($1, $2, $3) RETURNING *;
        `,
        'values': [
            project.id,
            project.name || '',
            project.userId
        ]
    };
};

module.exports.update = (id, { name }) => {

    return {
        'text': `
            UPDATE 
                ${TABLE}
            SET
                name = $2
            WHERE
                id = $1
        `,
        'values': [id, name]
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


module.exports.getProjectsAndTasks = () => {

    return {
        'text': `
            SELECT 
                    p.id as "id",
                    p.name as "name",
                    (
                        SELECT 
                            coalesce(
                            json_agg(
                                json_build_object(
                                    'id', t.id,
                                    'content', t.content,
                                    'isDone', t.is_done,
                                    'createdAt', t.created_at,
                                    'dueAt', t.due_at
                                )
                            ), '[]'::json) 
                        FROM tasks t
                        WHERE t.project_id = p.id
                    ) as "tasks"
            FROM projects p;
        `,
        'values': []
    };
};


