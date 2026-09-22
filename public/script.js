const createButton = document.getElementById("createButton");
const userInput = document.getElementById("userInput");
const dueDate = document.getElementById("dueDate");
const datePicker = document.getElementById("datePicker");
const prioritizeButton = document.getElementById("prioritizeButton");
const allTaskDiv = document.getElementById("allTaskDiv");

const mainTaskDiv = document.createElement("div");
// mainTaskDiv.style.background = "purple";
mainTaskDiv.style.width = "400px";
mainTaskDiv.style.borderRadius = "30px";
mainTaskDiv.style.margin = "auto";
mainTaskDiv.style.display = "block";
mainTaskDiv.style.justifyContent = "center";
mainTaskDiv.style.alignItems = "center";
mainTaskDiv.style.columnGap = "5px";
mainTaskDiv.style.marginTop = "20px";

// Changes the API_URL based on if the hostname equals localhost or not
const API_URL =
    window.location.hostname === "localhost"
        ? ""
        : "https://todolistwebapplication-ofkq.onrender.com";

// Stores the current date and time as an object
// using Moment.js library
const now = moment();

$(datePicker).datetimepicker({
    format: 'YYYY-MM-DD HH:mm',
    defaultDate: now,   // The pickers default date
    minDate: now        // Dates before this can't be selected
});

// Whenever the datetime picker changes
// check if the date is valid
// and then format the date accordingly
$(datePicker).on("dp.change", function (event) {

    if (event.date) {
        dueDate.value = event.date.format("YYYY-MM-DD HH:mm");
    }
});

window.onload = async function () {

    const response = await fetch(`${API_URL}/tasks`);
    const currentTask = await response.json();

    if (currentTask.length === 0) {
        document.body.removeChild(allTaskDiv);
    }
};

function createTask(taskId, taskText, taskIsCompleted, taskDueDate, taskExist) {

    const newTask = new Task(taskId, taskText, taskIsCompleted, taskDueDate, taskExist);

    let taskIdInput = newTask.getTaskId();
    let taskTextInput = newTask.getTaskText();
    let taskDueDateInput = newTask.getTaskDueDate();

    let formattedDueDate = "";

    if (taskDueDateInput) { // If the date is not null, undefined or empty, 
        //proceed.
        formattedDueDate = taskDueDateInput;
    }

    // /** ********************************************** */
    const taskContainer = document.createElement("div");
    taskContainer.style.background = "white";
    // taskContainer.style.height = "40px";
    taskContainer.style.width = "380px";
    taskContainer.style.borderRadius = "30px";
    taskContainer.style.margin = "auto";
    taskContainer.style.display = "flex";
    taskContainer.style.justifyContent = "center";
    taskContainer.style.alignItems = "center";
    taskContainer.style.columnGap = "5px";
    taskContainer.style.marginTop = "20px";
    taskContainer.classList.add("border", "border-dark");
    /** ********************************************** */

    /** ********************************************** */
    const headingThree = document.createElement("h5");
    headingThree.style.margin = "auto";
    headingThree.style.wordBreak = "break-word";
    headingThree.style.whiteSpace = "normal";
    headingThree.textContent = taskTextInput;
    // headingThree.style.color = "black";
    headingThree.style.fontWeight = "normal";
    headingThree.classList.add("h5");
    headingThree.style.textDecoration = "none";
    /** ********************************************** */

    /** ********************************************** */
    const headingContainer = document.createElement("div");
    // headingContainer.style.backgroundColor = "lightBlue";
    headingContainer.style.width = "130px";
    /** ********************************************** */

    /** ********************************************** */
    const buttonContainer = document.createElement("div");
    // buttonContainer.style.backgroundColor = "green";
    buttonContainer.style.width = "80px";
    buttonContainer.style.paddingTop = "5px";
    buttonContainer.style.paddingBottom = "5px";
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "center";
    buttonContainer.style.alignItems = "center";
    buttonContainer.style.gap = "5px";
    /** ********************************************** */

    /** ********************************************** */
    const completedBtn = document.createElement("button");

    completedBtn.classList.add("btn", "btn-outline-success");

    const completedBtnIcon = document.createElement("i");
    completedBtnIcon.classList.add("bi", "bi-check-square");

    completedBtn.appendChild(completedBtnIcon);
    /** ********************************************** */

    /** ********************************************** */
    const deleteBtn = document.createElement("button");

    deleteBtn.classList.add("btn", "btn-outline-danger");

    const deleteBtnIcon = document.createElement("i");
    deleteBtnIcon.classList.add("bi", "bi-trash");

    deleteBtn.appendChild(deleteBtnIcon);
    /** ********************************************** */

    /** ********************************************** */
    const dueDateContainer = document.createElement("div");
    // dueDateContainer.style.backgroundColor = "yellow";
    dueDateContainer.style.width = "120px";
    dueDateContainer.style.height = "20px";

    const displayDueDate = document.createElement("p");
    displayDueDate.style.textAlign = "center";
    displayDueDate.textContent = formattedDueDate;

    const verticalLine = document.createElement("div");
    verticalLine.classList.add("vr");
    /** ********************************************** */

    /** ********************************************** */
    buttonContainer.appendChild(completedBtn);
    buttonContainer.appendChild(deleteBtn);
    headingContainer.appendChild(headingThree);
    dueDateContainer.appendChild(displayDueDate);
    taskContainer.appendChild(dueDateContainer);
    taskContainer.appendChild(verticalLine);
    taskContainer.appendChild(headingContainer);
    taskContainer.appendChild(buttonContainer);
    mainTaskDiv.appendChild(taskContainer);
    allTaskDiv.appendChild(mainTaskDiv);
    document.body.appendChild(allTaskDiv);
    /** ********************************************** */

    /** ********************************************** */
    completedBtn.addEventListener("click", async () => {

        await fetch(`${API_URL}/tasks`, {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                id: taskIdInput
            })
        });

        taskContainer.style.background = "lightGreen";
    });
    /** ********************************************** */

    /** ********************************************** */
    deleteBtn.addEventListener("click", async () => {

        await fetch(`${API_URL}/tasks`, {
            method: "DELETE",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                id: taskIdInput
            })
        });

        mainTaskDiv.removeChild(taskContainer);
    });
    /** ********************************************** */
}

createButton.addEventListener("click", async () => {

    const usersTask = userInput.value.trim();
    const taskDueDate = dueDate.value;

    if (usersTask === "") {
        return;
    }

    const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            task: usersTask,
            duedate: taskDueDate,
            exist: 1
        })
    });

    const task = await response.json();

    createTask(task.id, usersTask, task.completed, task.duedate, task.exist);
});

const timer = ms => new Promise(res => setTimeout(res, ms))

prioritizeButton.addEventListener("click", async () => {

    for (let i = 0; i < mainTaskDiv.childNodes.length; i = 0) {
        mainTaskDiv.removeChild(mainTaskDiv.childNodes[i]);
    }

    const response = await fetch(`${API_URL}/tasks`);
    const currentTask = await response.json();

    currentTask.sort((a, b) =>
        a.duedate > b.duedate ? 1 : -1
    );

    for (let i = 0; i < currentTask.length; i++) {
        await timer(750);
        let id = currentTask[i].id;
        let task = currentTask[i].task;
        let completed = currentTask[i].completed;
        let due_date = currentTask[i].duedate;
        let task_exist = currentTask[i].exist;

        createTask(id, task, completed, due_date, task_exist);

        if (completed === 1) {
            mainTaskDiv.childNodes[i].style.background = "lightGreen";
        }
    }
});

document.addEventListener("DOMContentLoaded", async function () {

    const response = await fetch(`${API_URL}/tasks`);
    const currentTask = await response.json();

    if (currentTask.length !== 0) {

        for (let i = 0; i < currentTask.length; i++) {
            await timer(750);
            let id = currentTask[i].id;
            let task = currentTask[i].task;
            let completed = currentTask[i].completed;
            let due_date = currentTask[i].duedate;
            let task_exist = currentTask[i].exist;

            createTask(id, task, completed, due_date, task_exist);

            if (completed === 1) {
                mainTaskDiv.childNodes[i].style.background = "lightGreen";
            }
        }
    }
});