const inputText = document.getElementById("inputText");
const clickButton = document.getElementById("clickButton");

const allTaskDiv = document.createElement("div");
// allTaskDiv.style.backgroundColor = "yellow";
allTaskDiv.style.width = "400px";
allTaskDiv.style.margin = "auto";

let numOfTask = 0;

clickButton.onclick = function () {

    numOfTask++;
    let text = inputText.value;

    if (text !== "") {

        const mainTaskDiv = document.createElement("div");
        mainTaskDiv.style.background = "linear-gradient(to bottom, #2F3C42 0%, #2A353A 50%, #242D31 100%)";
        // mainTaskDiv.style.height = "40px";
        mainTaskDiv.style.width = "260px";
        mainTaskDiv.style.borderRadius = "30px";
        mainTaskDiv.style.margin = "auto";
        mainTaskDiv.style.display = "flex";
        mainTaskDiv.style.justifyContent = "center";
        mainTaskDiv.style.alignItems = "center";
        mainTaskDiv.style.columnGap = "5px";
        mainTaskDiv.style.marginTop = "20px";

        const headingThree = document.createElement("h3");
        headingThree.style.margin = "auto";
        headingThree.style.wordBreak = "break-word";
        headingThree.style.whiteSpace = "normal";
        headingThree.textContent = text;
        headingThree.style.color = "#CFCFCF";
        headingThree.style.fontWeight = "normal";

        const taskContainer = document.createElement("div");
        // taskContainer.style.backgroundColor = "lightBlue";
        // taskContainer.style.height = "25px";
        taskContainer.style.width = "150px";
        // taskContainer.style.justifyContent = "center";

        const buttonContainer = document.createElement("div");
        // buttonContainer.style.backgroundColor = "green";
        buttonContainer.style.width = "80px";
        buttonContainer.style.paddingTop = "5px";
        buttonContainer.style.paddingBottom = "5px";
        buttonContainer.style.display = "flex";
        buttonContainer.style.justifyContent = "center";
        buttonContainer.style.alignItems = "center";

        const completedBtn = document.createElement("button");
        completedBtn.style.height = "35px";
        completedBtn.style.width = "35px";
        completedBtn.style.borderRadius = "30px";
        completedBtn.style.backgroundColor = "#E38E7D";
        completedBtn.style.fontSize = "23px";
        completedBtn.textContent = "✓";

        const deleteBtn = document.createElement("button");
        deleteBtn.style.height = "35px";
        deleteBtn.style.width = "35px";
        deleteBtn.style.borderRadius = "30px";
        deleteBtn.style.backgroundColor = "#E38E7D";
        deleteBtn.style.fontSize = "23px";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.textContent = "🗑";

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

            if (headingThree.style.textDecoration === "none") {
                headingThree.style.textDecoration = "line-through";
            }
            else {
                headingThree.style.textDecoration = "none";
            }
        });

        deleteBtn.addEventListener("click", () =>{
            console.log("deleted");
            allTaskDiv.removeChild(mainTaskDiv);
        });

        completedBtn.addEventListener("mouseover", () => {
            completedBtn.style.backgroundColor = "#41B04C";
        });

        completedBtn.addEventListener("mouseout", () => {
            completedBtn.style.backgroundColor = "#E38E7D";
        });

        deleteBtn.addEventListener("mouseover", () => {
            deleteBtn.style.backgroundColor = "#E53412";
        });

        deleteBtn.addEventListener("mouseout", () => {
            deleteBtn.style.backgroundColor = "#E38E7D";
        });
    }
    else {
        console.log("EMPTY");
    }
};