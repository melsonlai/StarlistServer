require('../../config.js');
const pgp = require('pg-promise')();
const db = pgp(process.env.DB_URL);

const schemaSql = `
    -- Extensions
    CREATE EXTENSION IF NOT EXISTS pg_trgm;
	CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    -- Drop (droppable only when no dependency)
    DROP INDEX IF EXISTS todos_idx_title;
	DROP INDEX IF EXISTS todos_idx_content;
    DROP INDEX IF EXISTS todos_idx_deadline;
	DROP INDEX IF EXISTS todos_idx_userid;
    DROP TABLE IF EXISTS todos;

	DROP TABLE IF EXISTS stars;

	DROP TABLE IF EXISTS users;

    -- Create
	CREATE TABLE users (
		id				uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
		ts				bigint NOT NULL DEFAULT (extract(epoch from now()))
	);

	CREATE TABLE stars (
		"dbID"			serial PRIMARY KEY NOT NULL,
		"starID"		text DEFAULT NULL,
		const			text DEFAULT NULL,
		"IAUName"		text DEFAULT NULL,
		designation		text DEFAULT NULL,
		ra				real NOT NULL,
		dec				real NOT NULL,
		vmag			real NOT NULL
	);

    CREATE TABLE todos (
        id				uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
        title			text NOT NULL,
		content			text DEFAULT NULL,
		deadline		bigint NOT NULL,
		importance		smallint NOT NULL,
		"starID"		integer REFERENCES stars ("dbID"),
        ts              bigint NOT NULL DEFAULT (extract(epoch from now())),
		"doneTs"		bigint DEFAULT NULL,
		"userID"		uuid REFERENCES users (id)
    );
    CREATE INDEX todos_idx_deadline ON todos USING btree(deadline);
	CREATE INDEX todos_idx_userid ON todos USING btree("userID");
    CREATE INDEX todos_idx_title ON todos USING gin(title gin_trgm_ops);
	CREATE INDEX todos_idx_content ON todos USING gin(content gin_trgm_ops);
`;

const dataSql = `
    -- Populate dummy data
	INSERT INTO users (ts)
	SELECT round(extract(epoch from now()) + (i + 100) * 3600.0)
	FROM generate_series(1, 100) AS s(i);

	INSERT INTO stars ("starID", const, "IAUName", designation, ra, dec, vmag)
	SELECT
		random()::text,
		random()::text,
		random()::text,
		random()::text,
		random() * 359 - 180,
		random() * 179 - 90,
		random() * 7 - 1
	FROM generate_series(1, 100) AS s(i);

    INSERT INTO todos (title, content, deadline, importance, "starID", "userID")
    SELECT
        'title' || i,
        'content' || i,
        round(extract(epoch from now()) + (i + 100) * 3600.0),
		round(random() + 1),
		round(random() * 98 + 1),
		users.id
    FROM generate_series(1, 100) AS s(i), users;
`;

db.none(schemaSql).then(() => {
    console.log('Schema created');
    db.none(dataSql).then(() => {
        console.log('Data populated');
        pgp.end();
    });
}).catch(err => {
    console.log('Error creating schema', err);
});
