//1
const carro = {
    marca: "Tesla",
    modelo: "Xl",
    ano: 1900,
    matricula: "xv-20-co",
    celindragem: 20,
    cavalagem: 10,
}

//2
function SaberMatricula() {
    console.log("Marca: " + carro.matricula);
    console.log("Matricula: " + carro.matricula);
}
SaberMatricula();

//3 //4
function LigarCarro() {
    if (carro.ligado === undefined) {
        carro.ligado = true;
        console.log("Carro Ligado");
    } else {
        if (carro.ligado) {
            carro.ligado = false;
            console.log("Carro Ligado");
        } else {
            carro.ligado = true;
            console.log("Carro Desligado");
        }
    }
}
LigarCarro();

//5 proximas-revisoes
function addRevisao(data) {
    if (carro['proximas-revisoes'] === undefined) {
        carro['proximas-revisoes'] = [];
        carro['proximas-revisoes'].push(data);
    } else {
        carro['proximas-revisoes'].push(data);
    }
}
addRevisao("10/07/2020");
addRevisao("11/08/2022");

function showRevisoes() {
    for (i = 0; i < carro['proximas-revisoes'].length; i++) {
        console.log("Data: " + i + " " + carro['proximas-revisoes'][i]);
    }
}
showRevisoes();