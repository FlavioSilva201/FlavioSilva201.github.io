//Declaração de variaveis
const numero = 10; //Data type = number
const pi = 3.14; //Data type = number
const letra = "L"; //Data type = String
const letras = 'String'; //Data type = String
const boolean = true; //Data type = boolean

let nome; // variavel declarada mas sem valor;
//const não permite declarar variaveis sem inicializar

//Apresentação na tela do valor das variaveis
console.log("Valor numero = " + numero);
console.log("Valor pi = " + pi);
console.log("Valor letra = " + letra);
console.log("Valor letras = " + letras);
console.log("Valor boolean = " + boolean);

console.log("Valor nome = " + nome); //Variavel não inicializada por isso é undefined
nome = "Zé";
console.log("Valor nome = " + nome);
nome = "João";
console.log("Valor nome = " + nome);

console.log("---------------");

//Soma entre variaveis
let x = 5;
let y = 6;
let z = x + y;

const batman = 1 + 2 + 3;
const superman = "Super" + "-" + "Man";

const letrasENumeros = "1" + 2 + 3; //JS Trasforma tudo em String
const numerosELetras = 2 + 3 + "1"; // JS faz a soma e depois transforma em String

let t = 1;

console.log("X = " + x);
console.log("Y = " + y);
console.log("Z = " + z);

console.log("T = " + t);
t++; // t=t+1; // t+=1;
console.log("T++ = " + t);

console.log("BatMan = " + batman);
console.log("superman = " + superman);

console.log("letrasENumeros = " + letrasENumeros);
console.log("numerosELetras = " + numerosELetras);

console.log("--------------");

//Redeclaração de Variaveis
var cenas = 3;
console.log("Valor cenas = " + cenas); //A variavel numero = 10 deixou de existir e agora foi novamente declarada como 3;
var cenas = "cenas";
console.log("Valor cenas = " + cenas); //A variavel numero = 10 deixou de existir e agora foi novamente declarada como 3;

console.log("------------");
//Barra de suporte

const simbolosStrings1 = "a \' a"; //Apresenta '
const simbolosStrings2 = "a \" a"; //Apresenta "
const simbolosStrings3 = "a \\ a"; //Apresenta \
const simbolosStrings4 = "a \n a"; //Apresenta nova linha <br>
const simbolosStrings5 = "a \r a"; //Apresenta 
const simbolosStrings6 = "a \t a"; //tab
const simbolosStrings7 = "a c\b a"; //Apresenta backspace (apaga)
const simbolosStrings8 = "a \f a"; //Apresenta form feed

console.log("simbolosStrings1 = " + simbolosStrings1);
console.log("simbolosStrings2 = " + simbolosStrings2);
console.log("simbolosStrings3 = " + simbolosStrings3);
console.log("simbolosStrings4 = " + simbolosStrings4);
console.log("simbolosStrings5 = " + simbolosStrings5);
console.log("simbolosStrings6 = " + simbolosStrings6);
console.log("simbolosStrings7 = " + simbolosStrings7);
console.log("simbolosStrings8 = " + simbolosStrings8);



//Let vs Var vs Const
console.log("Let vs Var vs Const");
// Uma variavel const não pode ser alterada futuramente
// Tanto as variaveis Let vs Var podem ser alteradas futuramente, mas a grande diferença entre elas é que let respeita o scop onde está, enquanto a var não, o que pode causar certa confusão.

console.log("Const");
const constVariable = 3;
// constVariable =4; //error "Assignment to constant variable"


for (i = 0; i < 1; i++) {
    var varVariable = 40;
    let letVariable = 60;
}
console.log("varVariable " + varVariable); //not error, mas é chato
// console.log("letVariable " + letVariable); // error "letVariable is not defined"

//Outras Variaveis

let carros = ["Saab", "Volvo", "BMW"]; //Array
let pessoa = { primeiroNome: "João", ultimoNome: "Santos", idade: 50, corOlhos: "Azul" }; //Objeto

//fim