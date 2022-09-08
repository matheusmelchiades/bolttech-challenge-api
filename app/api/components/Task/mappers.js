module.exports.fromDB = taskDb => {

    return {
        'id': taskDb.id,
        'content': taskDb.content,
        'isDone': taskDb.is_done,
        'createAt': taskDb.create_at,
        'dueAt': taskDb.due_at,
        'projectId': taskDb.project_id
    };
};
