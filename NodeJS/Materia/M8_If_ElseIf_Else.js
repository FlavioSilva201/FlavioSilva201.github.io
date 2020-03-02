console.log("If Statement");
/*
if (condition) {
   statements
}
*/
var num1 = 7;
var num2 = 10;

if (num1 < num2) { //true
    // irá entrar neste bloco de código 
    console.log("O num1 < num2");
}
if (2 > 10) { //false
    // Não irá entrar neste bloco de código
    console.log("O num1 > num2");
}
if ("ola" == "ola") { // true
    console.log("O num1 == num2");
}

console.log("--------------");
console.log("Else Statement");
/*
if (expression) {
   // executed if condition is true
}
else {
   // executed if condition is false
}
 */
if (10 < 9) { //False
    //Não entra aqui
    console.log("Falso");
} else { //True
    //Entra aqui porque o "if" é Falso
    console.log("10 > 9 -> Verdade");
}


console.log("--------------");
console.log("Else If Statement");
if (2 == 1) {
    // executa se for verdadeiro
    console.log("2 = 1 -> Falso");
} else if (2 == 2) {
    // executa se a condição de cima for falsa e se esta for verdadeira
    console.log("2 = 1 -> Verdade");
} else {
    // executa se todas as outrasc ondições forem falsas
    console.log("O if de cima está certo por isso não entra aqui");
}