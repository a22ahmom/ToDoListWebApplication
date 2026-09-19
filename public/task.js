class Task {

    constructor(id, text, completed, dueDate, exist) {
        this.taskId = id;
        this.taskText = text;
        this.taskCompleted = completed;
        this.taskDueDate = dueDate;
        this.exist = exist;
    }

    print() {
        console.log("printing from class Task.js");
    }

    getTaskId() {
        return this.taskId;
    }

    getTaskText() {
        return this.taskText;
    }

    getTaskCompleted() {
        return this.taskCompleted;
    }

    getTaskDueDate() {
        return this.taskDueDate;
    }

    getTaskExist() {
        return this.exist;
    }
}