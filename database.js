const Database = require("better-sqlite3");

const db = new Database("tasks.db");

console.log("Database connected!");