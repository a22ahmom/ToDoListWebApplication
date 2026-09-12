const createButton = document.getElementById("createButton");
const userInput = document.getElementById("userInput");
const dueDate = document.getElementById("dueDate");
const datePicker = document.getElementById("datePicker");

// Assigning the minimum date to pick from date input.
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
let currentDay = String(currentDate.getDate()).padStart(2, '0');
let currentHour = String(currentDate.getHours()).padStart(2, '0');
let currentMinutes = String(currentDate.getMinutes()).padStart(2, '0');
let formatedCurrentDate = currentDay + '-' + currentMonth + '-' + currentYear + ' ' + currentHour + ':' + currentMinutes;
// dueDate.min = formatedCurrentDate;
dueDate.value = formatedCurrentDate;

// console.log("1.", dueDate.value);

$(datePicker).datetimepicker({
    format: 'DD/MM/YYYY HH:mm'
});

const allTaskDiv = document.createElement("div");
// allTaskDiv.style.backgroundColor = "yellow";
allTaskDiv.style.width = "500px";
allTaskDiv.style.margin = "auto";

// let mainTaskDiv;
const mainTaskDiv = document.createElement("div");
// mainTaskDiv.style.background = "purple";
// mainTaskDiv.style.height = "40px";
mainTaskDiv.style.width = "400px";
mainTaskDiv.style.borderRadius = "30px";
mainTaskDiv.style.margin = "auto";
mainTaskDiv.style.display = "block";
mainTaskDiv.style.justifyContent = "center";
mainTaskDiv.style.alignItems = "center";
mainTaskDiv.style.columnGap = "5px";
mainTaskDiv.style.marginTop = "20px";
// mainTaskDiv.classList.add("border", "border-dark");

// let numOfTask = 0;

function createTask(taskId, textInput, dueDateInput) {

    /** ********************************************** */
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
    headingThree.textContent = textInput;
    // headingThree.style.color = "black";
    headingThree.style.fontWeight = "normal";
    headingThree.classList.add("h5");
    headingThree.style.textDecoration = "none";
    /** ********************************************** */

    /** ********************************************** */
    const headingContainer = document.createElement("div");
    // headingContainer.style.backgroundColor = "lightBlue";
    // headingContainer.style.height = "25px";
    headingContainer.style.width = "130px";
    // headingContainer.style.justifyContent = "center";
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
    displayDueDate.textContent = dueDateInput;
    displayDueDate.style.textAlign = "center";

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

        const response = await fetch("/tasks", {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                id: taskId
            })
        });

        taskContainer.style.background = "lightGreen";

        const result = await response.json();
        console.log(result.completed);
    });
    /** ********************************************** */

    /** ********************************************** */
    deleteBtn.addEventListener("click", async () => {

        const response = await fetch("/tasks", {
            method: "DELETE",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                id: taskId
            })
        });

        mainTaskDiv.removeChild(taskContainer);

        console.log("deleted");
    });
    /** ********************************************** */
}

createButton.addEventListener("click", async () => {

    const usersTask = userInput.value.trim();
    const taskDueDate = dueDate.value;

    if (usersTask === "") {
        console.log("Empty");
        return;
    }

    const response = await fetch("/tasks", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            text: usersTask,
            dueDate: taskDueDate
        })
    });

    const task = await response.json();

    // console.log(task.dueDate);

    createTask(task.id, usersTask, task.completed);
});


document.addEventListener("DOMContentLoaded", async function () {

    const response = await fetch("/tasks");
    const currentTask = await response.json();

    for (let i = 0; i < currentTask.length; i++) {
        let id = currentTask[i].id;
        let task = currentTask[i].text;
        let completed = currentTask[i].completed;
        let due_date = currentTask[i].dueDate;
        createTask(id, task, due_date);

        if (completed === 1) {
            mainTaskDiv.childNodes[i].style.background = "lightGreen";
            // console.log("111");
        }
    }
});