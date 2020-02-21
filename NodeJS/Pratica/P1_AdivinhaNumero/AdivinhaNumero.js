var readline = require('readline-sync'); //importa o jason
let count = 0;
let random = Math.floor(Math.random() * 11);
let num1;

console.log("Tenta adivinhar o número escondido de 0 a 10!");

do {
    console.log("Qual é a tua tentativa?");
    num1 = readline.question("Num: "); // espera que o utilizador clique no enter

    count++;
    if (num1 < random) {
        console.log("O número escondido é maior!");
    } else if (num1 > random) {
        console.log("O número escondido é menor!");
    } else {
        console.log("Acertaste! Em: " + count + " tentativas;");
    }
} while (num1 != random);