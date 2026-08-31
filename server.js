const express = require("express");
const db = require("./database");

const app = express();

app.use(express.json());

const PORT = 3000;

app.get("/tasks", (req, res) => {

    const tasks = db.prepare(`
        SELECT * FROM tasks
    `).all();

    res.json(tasks);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});