if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

// Accomplish a TodoItem
function accomplish(id) {
	const sql = `
		UPDATE todos
		SET \"doneTs\" = extract(epoch from now())
		WHERE id = $1#
		RETURNING id;
	`;

	return db.one(sql, id);
}

// Create a TodoItem
function create(title, content, deadline, importance, starID) {
    const sql = `
        INSERT INTO todos ($<this:name>)
        VALUES ($<title>, $<content>, $<deadline>, $<importance>, $<starID>)
        RETURNING *;
    `;
    return db.one(sql, {title, content, deadline, importance, starID});
}

// Edit a TodoItem
function update(id, title, content, deadline, importance, starID) {
	const sql = `
		UPDATE todos
		SET title = $<title~>, content = $<content~>, deadline = $<deadline#>, importance = $<importance#>, \"starID\" = $<starID#>
		WHERE id = $<id>
		RETURNING *;
	`;
	return db.one(sql, {id, title, content, deadline, importance, starID});
}

// Delete a TodoItem
function del(id) {
	const sql = `
		DELETE FROM todos
		WHERE id = $1#
		RETURNING id
	`;
	return db.one(sql, id);
}

// List a TodoItem
function listSingle(id) {
	const sql = `
		SELECT * FROM todos
		WHERE id = $1#;
	`;
	return db.one(sql, id);
}

// List TodoItems
function list10(searchText = '', unaccomplishedOnly = false, start) {
    const where = [];
    if (searchText) {
        where.push(`title ILIKE '%$1:value%'`);
		where.push(`content ILIKE '%$1:value%'`);
	}
    if (start)
        where.push('id < $2');
	if (unaccomplishedOnly)
		where.push("\"doneTs\" IS NULL");
    const sql = `
        SELECT *
        FROM posts
        ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
        ORDER BY deadline DESC
        LIMIT 10;
    `;
    return db.any(sql, [searchText, start]);
}

module.exports = {
	accomplish,
	create,
	update,
	del,
	listSingle,
    list10
};
