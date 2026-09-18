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

    setTaskId(id) {
        this.taskId = id;
    }

    getTaskText() {
        return this.taskText;
    }

    setTaskText(text) {
        this.taskText = text;
    }

    getTaskCompleted() {
        return this.taskCompleted;
    }

    setTaskCompleted(completed) {
        this.taskCompleted = completed;
    }

    getTaskDueDate() {
        return this.taskDueDate;
    }

    setTaskDueDate(dueDate) {
        this.taskDueDate = dueDate;
    }

    getTaskExist() {
        return this.exist;
    }

    setTaskExist(taskExist) {
        this.exist = taskExist;
    }
}