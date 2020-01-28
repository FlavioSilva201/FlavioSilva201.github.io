console.log("Operadores");

/*
Comparação

==	equal to
===	equal value and equal type
!=	not equal (retorna o contrário do suposto)
!==	not equal value or not equal type
>	greater than
<	less than
>=	greater than or equal to
<=	less than or equal to
?	ternary operator
*/

console.log();
console.log("Comparação de números '==' ");
const x = 10,
    y = 20;
console.log(1 == 2); //false
console.log(1 == 1.0); //true
console.log(1 == 1.4); //false
console.log(1 == 1); //true
console.log(1 != 1); //false
console.log(1 < 2); //true
console.log(1 > 2); //false
console.log(x == y); //false

console.log();
console.log("Comparação de Strigns '=='");
console.log("hey" == "Olá"); //false
console.log("hey" != "Olá"); //true
console.log("hello" == "hello"); //true
console.log("l" < "o"); //true
console.log("l" > "o"); //false

console.log();
console.log("Comparação de booleans '=='");
console.log(true == false); //false
console.log(true == true); //true
console.log(false == false); //true
console.log(true != false); //true
console.log(true < false); // false
console.log(true > false); //true

console.log();
console.log("Comparação de Strigns e números e booleans '=='");
console.log("true" == true); // false
console.log("true" == false); // false
console.log("false" == false); // false
console.log("d" == "5"); // false
console.log("5" == 5); // true
console.log(1 == true); // true
console.log(0 == false); // true
console.log("1" == true); // true
console.log("0" == false); // true
// os 2 "="  só e apenas o valor



console.log();
console.log("Comparação de números '===' ");
console.log(1 === 2); //false
console.log(1 === 1.0); //true
console.log(1 === 1.4); //false
console.log(1 === 1); //true
console.log(1 !== 1); //false
console.log(x === y); //false

console.log();
console.log("Comparação de Strigns '=='");
console.log("hey" === "Olá"); //false
console.log("hey" !== "Olá"); //true
console.log("hello" === "hello"); //true

console.log();
console.log("Comparação de booleans '=='");
console.log(true === false); //false
console.log(true === true); //true
console.log(false === false); //true
console.log(true !== false); //true

console.log();
console.log("Comparação de Strigns e números e booleans '=='");
console.log("true" === true); // false
console.log("true" === false); // false
console.log("false" === false); // false
console.log("d" === "5"); // false
console.log("5" === 5); // true
console.log(1 === true); // true
console.log(0 === false); // true
console.log("1" === true); // true
console.log("0" === false); // true
// os 3 "="  compara o tipo e o valor