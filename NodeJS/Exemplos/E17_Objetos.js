// Objetos
// Criação de um Objeto

let obejtoVazio = {}; // Criação de um objeto vazio

let carro = {
    "Marca": "Volkswagen",
    "Modelo": "fusca",
    "Ano": 2020,
    "Venda": true,
};

console.log(obejtoVazio);
console.log(carro);
console.log("-----------------------------");



// Acender, alterar e adicional propriedades
let caneta = {
    "Marca": "Bic",
    "Cor": "Azul",
    "Ponta": 1.6,
    "Obter": false,
};

//Aceder
console.log("Marca da Caneta: " + caneta.Marca);
console.log("Marca da Caneta: " + caneta["Cor"]);

// alterar
caneta.Ponta = 2;
caneta["Obter"] = true;
console.log("Marca da Caneta: " + caneta.Ponta);
console.log("Marca da Caneta: " + caneta["Obter"]);

// Adicionar
caneta.estilo = "Ponta fina";
caneta["tamanho"] = 17;
console.log(caneta);

console.log("----------");
console.log("----------");
console.log("----------");

// outros tipos de propriedades
caneta.array = [1, 2, 3];
caneta.objeto = {
    "propriedades1": "Valor1",
    "propriedades2": "Valor2"
};
console.log(caneta);