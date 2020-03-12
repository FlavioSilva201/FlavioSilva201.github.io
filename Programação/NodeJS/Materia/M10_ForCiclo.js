/*
for (statement 1; statement 2; statement 3) {
   code block to be executed
}
*/

console.log("Ciclo For");

for (i = 1; i < 10; i++) { // i = 1 -> var i = 1;
    //Este bloco de código irá ser repetido até o i ser igaul ou maior que 10, pois o ciclo é repetido enquanto a condição for true
    console.log("Repetição: " + i);
}

console.log("Ciclo 2");
let j = 1;
for (; j <= 10;) { // dá para deixar algumas condições vazias
    console.log("Repetição: " + j);
    j++; //mas convei deixar as funções basicas dentro do ciclo para ele ter um fim
}