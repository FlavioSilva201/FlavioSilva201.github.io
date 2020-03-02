const btnMudar = document.getElementById("btnMudar");
const texto = document.getElementById("Texto");

let num1 = true;
let sum = 0;



requestAnimationFrame(repeatOften);

function repeatOften() {

    if (sum == 100) {
        sum = 0;
        if (num1) {
            num1 = false;
            texto.classList.add("class1");
        } else {
            texto.classList.remove("class1");
            num1 = true;
        }
    } else {
        sum++;
    }
    requestAnimationFrame(repeatOften);
}





btnMudar.addEventListener(
    "click",
    () => {
        if (num1 == true) {
            num1 = false;
            texto.classList.add("class1");
        } else {
            texto.classList.remove("class1");
            num1 = true;
            //texto.style.backgroundColor = "green";
        }
    },
);