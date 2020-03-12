const ppTxt = document.getElementById("ppTxt");
const dataComeco = document.getElementById("dataComeco");
const dataFim = document.getElementById("dataFim");
const dataTempo = document.getElementById("dataTempo");
const Combinacao = document.getElementById("Combinacao");
const MostrarPPCheckBox = document.getElementById("MostrarPPCheckBox");

let palavrapasse = ppTxt.value;
let dataAtual = "";
let dataFinal = "";
let TempoDemorado = "";
let combinacao = "";

const catarteres = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

ppTxt.addEventListener(
    "keyup",
    () => {
        let dataDAtual = new Date();
        dataAtual = "" + new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + ":" + new Date().getMilliseconds();
        console.log(dataAtual);
        dataComeco.innerHTML = "Começo: " + dataAtual;
        palavrapasse = ppTxt.value;
        console.log(palavrapasse);
        encontrar();
    });

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
    Combinacao.innerHTML = "Comb: " + combinacao;
    console.log("Descobri!");
    dataFinal = "" + new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + ":" + new Date().getMilliseconds();
    console.log("Data Final: " + dataFinal);
    dataFim.innerHTML = "Fim:" + dataFinal;
    let dataDFinal = new Date();
    let timeDiff = Math.abs(dataDFinal.getTime() - dataDAtual.getTime());
    let tempoDemorado = Math.ceil(timeDiff / (1000 * 3600 * 24));
    dataTempo.innerHTML = "Tempo: " + tempoDemorado;
};

MostrarPPCheckBox.addEventListener("click",
    () => {
        if (ppTxt.type === "text") {
            ppTxt.type = "password";
        } else {
            ppTxt.type = "text";
        }
    })