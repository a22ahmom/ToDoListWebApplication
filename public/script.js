console.log("PAGE SCRIPT LOADED", new Date().toLocaleTimeString());

inputText = document.getElementById("inputText");
const clickButton = document.getElementById("clickButton");

const allTaskDiv = document.createElement("div");
// allTaskDiv.style.backgroundColor = "yellow";
allTaskDiv.style.width = "400px";
allTaskDiv.style.margin = "auto";

let numOfTask = 0;

clickButton.addEventListener("click", async () => {

    // event.preventDefault();

    // console.log("1. Button clicked");

    numOfTask++;
    const text = inputText.value.trim();

    if (text === "") {
        console.log("Empty");
        return;
    }

    const response = await fetch("/tasks", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            text: text
        })
    });

    const task = await response.json();
    console.log(task);

    // console.log("2. About to fetch");



    // console.log("3. Fetch finished");


    // console.log("4. Task received");


    const mainTaskDiv = document.createElement("div");
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

    const headingThree = document.createElement("h5");
    headingThree.style.margin = "auto";
    headingThree.style.wordBreak = "break-word";
    headingThree.style.whiteSpace = "normal";
    headingThree.textContent = text;
    // headingThree.style.color = "black";
    headingThree.style.fontWeight = "normal";
    headingThree.classList.add("h5");

    const taskContainer = document.createElement("div");
    // taskContainer.style.backgroundColor = "lightBlue";
    // taskContainer.style.height = "25px";
    taskContainer.style.width = "130px";
    // taskContainer.style.justifyContent = "center";

    const buttonContainer = document.createElement("div");
    // buttonContainer.style.backgroundColor = "green";
    buttonContainer.style.width = "80px";
    buttonContainer.style.paddingTop = "5px";
    buttonContainer.style.paddingBottom = "5px";
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "center";
    buttonContainer.style.alignItems = "center";
    buttonContainer.style.gap = "5px";

    const completedBtn = document.createElement("button");
    completedBtn.classList.add("btn", "btn-outline-success");
    const completedBtnIcon = document.createElement("i");
    completedBtnIcon.classList.add("bi", "bi-check-square");

    completedBtn.appendChild(completedBtnIcon);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "btn-outline-danger");

    const deleteBtnIcon = document.createElement("i");
    deleteBtnIcon.classList.add("bi", "bi-trash");

    deleteBtn.appendChild(deleteBtnIcon);

    buttonContainer.appendChild(completedBtn);
    buttonContainer.appendChild(deleteBtn);
    taskContainer.appendChild(headingThree);
    mainTaskDiv.appendChild(taskContainer);
    mainTaskDiv.appendChild(buttonContainer);
    // mainTaskDiv.appendChild(completedBtn);
    // mainTaskDiv.appendChild(deleteBtn);
    allTaskDiv.appendChild(mainTaskDiv);
    document.body.appendChild(allTaskDiv);

    numOfTask = 0;

    headingThree.style.textDecoration = "none";

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
});