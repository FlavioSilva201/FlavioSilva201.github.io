import { ind } from "./langs.js";

const IndiomaSlect = document.getElementById("IndiomaSlect");

let indiomaDef = ind.Ingles;

main();

function main() {

    // Imprimir opções no select
    const valorIndiomaSlect = Object.keys(ind);
    for (let i = 0; i < valorIndiomaSlect.length; i++) {
        const el = document.createElement("option");
        el.textContent = valorIndiomaSlect[i];
        el.value = valorIndiomaSlect[i];
        if (!localStorage.getItem("LocalLang")) {
            if (valorIndiomaSlect[i] == "English") {
                el.selected = "selected";
                localStorage.setItem("LocalLang", "English");
            }
        } else {
            if (valorIndiomaSlect[i] == localStorage.getItem("LocalLang")) {
                el.selected = "selected";
                localStorage.setItem("LocalLang", localStorage.getItem("LocalLang"));
            }
        }
        IndiomaSlect.appendChild(el);
    }
    atualizarIndioma();
}

IndiomaSlect.onchange = function function1() {
    if (IndiomaSlect.value === "English") {
        indiomaDef = ind.Ingles;
        localStorage.setItem("LocalLang", "English");
    } else {
        indiomaDef = ind.Portugues;
        localStorage.setItem("LocalLang", "Portugues");
    }
    atualizarIndioma();
};

function atualizarIndioma() {

}