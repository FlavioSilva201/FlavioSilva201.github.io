const input = document.getElementById("textBox");
const ul = document.getElementById("ulList");
const buttonAdd = document.getElementById("addButton");
const formTask = document.getElementById("formTask");

buttonAdd.addEventListener(
    "click",
    () => {
        const li = document.createElement("li");
        li.textContent = input.value;

        const buttonRemove = document.createElement("button");
        buttonRemove.textContent = "Remove";
        buttonRemove.addEventListener(
            "click",
            () => {
                ul.removeChild(li);
            },
            false,
        );

        li.appendChild(buttonRemove);

        ul.prepend(li);
        //input.value = " ";
        // ol.appendChild(li);
    },
    false,
);

formTask.addEventListener(
    "submit",
    event => {
        event.preventDefault();
    },
    false,
);