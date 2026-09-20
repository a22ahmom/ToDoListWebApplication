require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL
}));

app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

// GET all tasks
app.get("/tasks", async (req, res) => {

    try {
        const result = await db.query(`
                SELECT
                    id,
                    task,
                    completed,
                    duedate,
                    exist
                FROM tasks
                ORDER BY id
            `);

        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to get tasks"
        });
    }
});

// CREATE task
app.post("/tasks", async (req, res) => {

    try {
        const task = req.body.task;
        const dueDate = req.body.duedate;
        const exist = req.body.exist;

        const result = await db.query(`
        INSERT INTO tasks (task, duedate, exist)
        VALUES ($1, $2, $3)
        RETURNING
            id,
            task,
            completed,
            duedate,
            exist
    `, [
            task,
            dueDate || null,
            exist
        ]);

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to create task"
        });
    }
});

// DELETE task
app.delete("/tasks", async (req, res) => {

    try {
        const id = req.body.id;

        await db.query(`
                DELETE FROM tasks WHERE id = $1
        `, [id]);
        
        res.json({
            messsage: "Task deleted"
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to delete task"
        });
    }
});

//UPDATE task
app.put("/tasks", async (req, res) => {

    try {
        const taskId = req.body.id;

        await db.query(`
            UPDATE tasks SET completed = 1 WHERE id = $1
        `, [taskId]);

        res.json({
            completed: 1
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to update task"
        });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});