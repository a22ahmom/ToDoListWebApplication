const express = require("express");
const db = require("./database");
// const path = require("path");

const app = express();

// app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const PORT = 3000;

app.get("/tasks", (req, res) => {

    const tasks = db.prepare(`
        SELECT * FROM tasks
    `).all();

    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    
    const text = req.body.text;

    const insertTask = db.prepare(`
        INSERT INTO tasks (text)
        VALUES (?)
    `);

    const result = insertTask.run(text);

    res.json({
        id: result.lastInsertRowid,
        text: text,
        completed: 0
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});