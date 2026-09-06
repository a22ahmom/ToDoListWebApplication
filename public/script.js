const createButton = document.getElementById("createButton");
const userInput = document.getElementById("userInput");

const allTaskDiv = document.createElement("div");
// allTaskDiv.style.backgroundColor = "yellow";
allTaskDiv.style.width = "400px";
allTaskDiv.style.margin = "auto";

const mainTaskDiv = document.createElement("div");
const completedBtn = document.createElement("button");
const deleteBtn = document.createElement("button");

let numOfTask = 0;

function createTask(textInput) {

    numOfTask++;

    // const usersTask = userInput.value.trim();

    if (textInput === "") {
        console.log("Empty");
        return;
    }

    /** ********************************************** */
    mainTaskDiv.style.background = "white";
    // mainTaskDiv.style.height = "40px";
    mainTaskDiv.style.width = "260px";
    mainTaskDiv.style.borderRadius = "30px";
    mainTaskDiv.style.margin = "auto";
    mainTaskDiv.style.display = "flex";
    mainTaskDiv.style.justifyContent = "center";
    mainTaskDiv.style.alignItems = "center";
    mainTaskDiv.style.columnGap = "5px";
    mainTaskDiv.style.marginTop = "20px";
    mainTaskDiv.classList.add("border", "border-dark");
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
    const taskContainer = document.createElement("div");
    // taskContainer.style.backgroundColor = "lightBlue";
    // taskContainer.style.height = "25px";
    taskContainer.style.width = "130px";
    // taskContainer.style.justifyContent = "center";
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
    completedBtn.classList.add("btn", "btn-outline-success");

    const completedBtnIcon = document.createElement("i");
    completedBtnIcon.classList.add("bi", "bi-check-square");

    completedBtn.appendChild(completedBtnIcon);
    /** ********************************************** */

    /** ********************************************** */
    deleteBtn.classList.add("btn", "btn-outline-danger");

    const deleteBtnIcon = document.createElement("i");
    deleteBtnIcon.classList.add("bi", "bi-trash");

    deleteBtn.appendChild(deleteBtnIcon);
    /** ********************************************** */

    /** ********************************************** */
    buttonContainer.appendChild(completedBtn);
    buttonContainer.appendChild(deleteBtn);
    taskContainer.appendChild(headingThree);
    mainTaskDiv.appendChild(taskContainer);
    mainTaskDiv.appendChild(buttonContainer);
    allTaskDiv.appendChild(mainTaskDiv);
    document.body.appendChild(allTaskDiv);
    /** ********************************************** */

    numOfTask = 0;
}

createButton.addEventListener("click", async () => {

    const usersTask = userInput.value.trim();

    const response = await fetch("/tasks", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            text: usersTask
        })
    });

    const task = await response.json();
    console.log(task);

    createTask(usersTask);
});

completedBtn.addEventListener("click", () => {

    if (mainTaskDiv.style.background === "white") {
        mainTaskDiv.style.background = "lightGreen";
    }
    else {
        mainTaskDiv.style.background = "white";
    }
});

deleteBtn.addEventListener("click", () => {
    console.log("deleted");
    allTaskDiv.removeChild(mainTaskDiv);
});

document.addEventListener("DOMContentLoaded", async function () {
    // console.log("Content loaded");

    const response = await fetch("/tasks");

    const task = await response.json();
    // console.log(task);


});