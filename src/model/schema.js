require('../../config.js');
const pgp = require('pg-promise')();
const db = pgp(process.env.DB_URL);

const schemaSql = `
    -- Extensions
    CREATE EXTENSION IF NOT EXISTS pg_trgm;

    -- Drop (droppable only when no dependency)
    DROP INDEX IF EXISTS todos_idx_title;
	DROP INDEX IF EXISTS todos_idx_content;
    DROP INDEX IF EXISTS todos_idx_deadline;
    DROP TABLE IF EXISTS todos;

    -- Create
    CREATE TABLE todos (
        id				serial PRIMARY KEY NOT NULL,
        title			text NOT NULL,
		content			text,
		deadline		bigint NOT NULL,
		importance		tinyint,
		"starID"		bigint NOT NULL DEFAULT -1,
        ts              bigint NOT NULL DEFAULT (extract(epoch from now())),
		doneTs			bigint
    );
    CREATE INDEX todos_idx_deadline ON todos USING btree(deadline);
    -- CREATE INDEX todos_idx_title ON todos USING gin(title gin_trgm_ops);
	-- CREATE INDEX todos_idx_content ON todos USING gin(content gin_trgm_ops);
`;

const dataSql = `
    -- Populate dummy posts
    INSERT INTO todos (title, content, deadline, importance)
    SELECT
        'title' || i,
        'content' || i,
		round(RAND() + 1), 
        round(extract(epoch from now()) + (i + 1000000) * 3600.0)
    FROM generate_series(1, 1000000) AS s(i);
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
