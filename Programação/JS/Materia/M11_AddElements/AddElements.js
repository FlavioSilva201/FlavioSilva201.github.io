// https://www.w3schools.com/js/js_htmldom_nodes.asp
console.log("https://www.w3schools.com/js/js_htmldom_nodes.asp");
const AddAfterBtn = document.getElementById("AddAfterBtn");
const RemoveBtn = document.getElementById("RemoveBtn");


let ol = document.getElementById("ol");

let num = 0;

AddAfterBtn.addEventListener(
    "click",
    () => {
        num++;
        let li = document.createElement("li");
        const text = document.createTextNode("Isto é um novo li com id: " + num);
        li.appendChild(text);
        ol.appendChild(li);
        // element.insertBefore(para, child); // Aparecer antes do outro elemento
    }
)

RemoveBtn.addEventListener(
    "click",
    () => {
        RemoveBtn.remove();
    }
)