if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

// Accomplish a TodoItem
function accomplish(id) {
	const sql = "
		UPDATE todos
		SET doneTs = extract(epoch from now())
		WHERE id = $1
		RETURNING id
	";

	return db.one(sql, id);
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

function create(mood, text) {
    const sql = `
        INSERT INTO posts ($<this:name>)
        VALUES ($<mood>, $<text>)
        RETURNING *
    `;
    return db.one(sql, {mood, text});
}

module.exports = {
    list,
    create
};
