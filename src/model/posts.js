if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

// Accomplish a TodoItem
function accomplish(id) {
	const sql = "
		UPDATE todos
		SET \"doneTs\" = extract(epoch from now())
		WHERE id = $1#
		RETURNING id;
	";

	return db.one(sql, id);
}

// Create a TodoItem
function create(title, content, deadline, importance, starID) {
    const sql = "
        INSERT INTO todos ($<this:name>)
        VALUES ($<title>, $<content>, $<deadline>, $<importance>, $<starID>)
        RETURNING *;
    ";
    return db.one(sql, {title, content, deadline, importance, starID});
}

// Edit a TodoItem
function update(id, title, content, deadline, importance, starID) {
	const sql = "
		UPDATE todos
		SET title = $<title~>, content = $<content~>, deadline = $<deadline#>, importance = $<importance#>, \"starID\" = $<starID#>
		WHERE id = $<id>
		RETURNING *;
	";
	return db.one(sql, {id, title, content, deadline, importance, starID});
}

function list(searchText = '', start) {
    const where = [];
    if (searchText)
        where.push(`text ILIKE '%$1:value%'`);
    if (start)
        where.push('id < $2');
    const sql = `
        SELECT *
        FROM posts
        ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
        ORDER BY id DESC
        LIMIT 10
    `;
    return db.any(sql, [searchText, start]);
}


module.exports = {
    list,
    create
};
