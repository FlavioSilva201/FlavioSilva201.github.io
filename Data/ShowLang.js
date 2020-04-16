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
        if (valorIndiomaSlect[i] == "Ingles") {
            el.selected = "selected";
        }
        IndiomaSlect.appendChild(el);
    }
    atualizarIndioma();
}

IndiomaSlect.onchange = function function1() {
    if (IndiomaSlect.value === "Ingles") {
        indioma = ind.Ingles;
    } else {
        indioma = ind.Portugues;
    }
    atualizarIndioma();
};


function atualizarIndioma() {

}