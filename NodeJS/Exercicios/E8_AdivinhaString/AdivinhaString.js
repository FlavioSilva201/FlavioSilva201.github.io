var readline = require('readline-sync'); //importa o jason
let dataAtual = "";
let dataFinal = "";
let combinacao = "";
let palavrapasse = "";

const catarteres = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

main();

function main() {
    console.log("Qual é a tua tentativa?");
    palavrapasse = readline.question("Frase: "); // espera que o utilizador clique no enter
    dataAtual = "" + new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + ":" + new Date().getMilliseconds();
    encontrar();
}

function encontrar() {
    combinacao = "";
    let tantativa = combinacao;
    for (i = 0; i < palavrapasse.length; i++) {
        for (j = 0; j < catarteres.length; j++) {
            if (palavrapasse[i] == catarteres[j]) {
                combinacao += catarteres[j];
                break;
            }
            tantativa = combinacao + catarteres[j];
            console.log(tantativa);
        }
    }
    console.log("--------------------");
    console.log("Comb: " + combinacao);
    console.log("Descobri!");
    dataFinal = "" + new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + ":" + new Date().getMilliseconds();
    console.log("Começo: " + dataAtual);
    console.log("Fim: " + dataFinal);
};