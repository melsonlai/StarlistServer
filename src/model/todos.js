if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

// Accomplish a TodoItem
function accomplish(id, userID) {
	const sql = `
		UPDATE todos
		SET \"doneTs\" = extract(epoch from now())
		WHERE id = \'$1#\' AND \"userID\" = \'$2#\'
		RETURNING id;
	`;

	return db.one(sql, [id, userID]);
}

// Create a TodoItem
function create(title, content, deadline, importance, userID) {
    const sql = `
        INSERT INTO todos ($<this:name>)
        VALUES ($<title>, $<content>, $<deadline>, $<importance>, $<userID>)
        RETURNING *;
    `;
    return db.one(sql, {title, content, deadline, importance, userID});
}

// Edit a TodoItem
function update(id, title, content, deadline, importance, userID) {
	const sql = `
		UPDATE todos
		SET title = $<title#>, content = $<content#>, deadline = $<deadline#>, importance = $<importance#>
		WHERE id = $<id> AND \"userID\" = $<userID>
		RETURNING *;
	`;
	return db.one(sql, {id, title, content, deadline, importance, userID});
}

// Delete a TodoItem
function del(id, userID) {
	const sql = `
		DELETE FROM todos
		WHERE id = \'$1#\' AND \"userID\" = \'$2#\'
		RETURNING id
	`;
	return db.one(sql, [id, userID]);
}

// List a TodoItem
function listSingle(id, userID) {
	const sql = `
		SELECT * FROM todos
		WHERE id = \'$1#\' AND \"userID\" = \'$2#\';
	`;
	return db.one(sql, [id, userID]);
}

// List TodoItems
function list10(searchText = '', unaccomplishedOnly = false, start, userID) {
    const where = ["\"userID\" = \'$3#\'"];
    if (searchText) {
        where.push(`title ILIKE '%$1:value%'`);
		where.push(`content ILIKE '%$1:value%'`);
	}
    if (start)
        where.push('deadline < $2');
	if (unaccomplishedOnly)
		where.push("\"doneTs\" IS NULL");
    const sql = `
        SELECT *
        FROM todos
        ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
        ORDER BY deadline DESC
        LIMIT 10;
    `;
    return db.any(sql, [searchText, start, userID]);
}

module.exports = {
	accomplish,
	create,
	update,
	del,
	listSingle,
    list10
};
