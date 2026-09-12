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
    const due_date = req.body.dueDate;

    const insertTaskText = db.prepare(`
        INSERT INTO tasks (text, dueDate)
        VALUES (?, ?)
    `);

    const newTaskText = insertTaskText.run(text, due_date);

    res.json({
        id: newTaskText.lastInsertRowid,
        text: text,
        completed: 0,
        dueDate: due_date
    });
});

app.delete("/tasks", (req, res) => {

    const id = req.body.id;

    const deleteTask = db.prepare(`
        DELETE FROM tasks WHERE id = ?
    `);

    const result = deleteTask.run(id);

    res.json({
        messsage: "Task deleted"
    });
});

app.put("/tasks", (req, res) => {

    const taskId = req.body.id;

    const isCompleted = db.prepare(`
        UPDATE tasks SET completed = 1 WHERE id = ?
    `);

    const result = isCompleted.run(taskId);

    res.json({
        completed: 1
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});