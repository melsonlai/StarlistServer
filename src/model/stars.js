if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

// Get User Stars
function listUserStars(userID) {
	const sql = `
		SELECT DISTINCT ON (stars."dbID") stars.*
		FROM stars INNER JOIN todos ON todos."userID" = \'$1#\';
	`;
	return db.any(sql, userID);
}

module.exports = {
	listUserStars
}
