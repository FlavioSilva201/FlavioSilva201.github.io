import { ind } from "./langs.js";

const IndiomaSlect = document.getElementById("IndiomaSlect");

let indioma = ind.Portugues;

main();

function main() {

    // Imprimir opções no select
    const valorIndiomaSlect = Object.keys(ind);
    for (let i = 0; i < valorIndiomaSlect.length; i++) {
        var opt = valorIndiomaSlect[i];
        const el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        if (valorIndiomaSlect[i] == "Portugues") {
            el.selected = "selected";
        }
        IndiomaSlect.appendChild(el);
    }
    atualizarIndioma();
}

IndiomaSlect.onchange = function function1() {
    switch (IndiomaSlect.value) {
        case "Ingles":
            indioma = ind.Ingles;
            break;
        case "Portugues":
            indioma = ind.Portugues;
            break;
        case "Frances":
            indioma = ind.Frances;
            break;
        case "Russo":
            indioma = ind.Russo;
            break;
        default:
            console.log("Deffaut");
            break;
    }
    atualizarIndioma();
};


function atualizarIndioma() {

}