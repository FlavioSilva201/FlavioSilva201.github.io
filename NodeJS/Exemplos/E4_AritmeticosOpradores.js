//Node.js é fixe, Java Script é fixe
//Operadores Aritmético
//Arithmetic Operators

const sum = 25 + 5;
const sub = 25 - 5;
const div = 25 / 5;
const mult = 25 * 5;
const rest = 25 % 5;
const expo = 25 ** 5;
let crem = 25;
crem++; //Increment
let decrem = 25;
decrem--; //decrement

console.log("25 + 5 = " + sum); //30
console.log("25 - 5 = " + sub); //20
console.log("25 / 5 = " + div); //5
console.log("25 * 5 = " + mult); // 125
console.log("25 % 5 = " + rest); //0
console.log("25 ** 5 = " + expo); // 9765625
console.log("25 ++ = " + crem); //26
console.log("25 -- = " + decrem); //24

console.log("--------------------");

let conclusao = sum + sub;
console.log("sum + sub = " + conclusao);
conclusao = sum - sub;
console.log("sum - sub = " + conclusao);

/*
+= =>	x += y =>	x = x + y;
-= =>	x -= y =>	x = x - y;
*= =>	x *= y =>	x = x * y;
/= =>	x /= y =>	x = x / y;
%= =>	x %= y =>	x = x % y;
**= =>	x **= y => x = x ** y;
*/

let f = 2;
f **= 8;
console.log("x **= y => " + f);

console.log("-----------String---------");

const nome1 = "João " + "Santos";
console.log("nome1 = " + nome1);

let nome2 = nome1 + " Soares";
console.log("nome2 = " + nome2);

nome2 += " Silva";
console.log("nome2 = " + nome2);

console.log("---- Strings + Numeros ------");

const q = 5 + 3 + 1;
const w = " 5 " + 3 + 1;
const e = " Hello " + 3 + 1;
const r = 3 + " Hello " + 1;
const t = 3 + " 5 " + 1;
const u = 1 + 3 + " Hello ";
const i = 1 + 3 + " 5 ";

console.log("5 + 3 + 1 = " + q);
console.log('"5" + 3 + 1 = ' + w);
console.log('"Hello" + 3 + 1 = ' + e);
console.log('3 + "Hello" + 1 = ' + r);
console.log('3 + "5" + 1 = ' + t);
console.log('1 + 3 + "Hello" = ' + u);
console.log('1 + 3 + "5" = ' + i);