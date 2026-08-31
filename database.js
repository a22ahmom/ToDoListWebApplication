const Database = require("better-sqlite3");

const db = new Database("tasks.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        completed INTEGER DEFAULT 0
    )
`);

module.exports = db;