console.log("Hello World!");
console.log("Hello Another World!")
greet("Flávio");
console.log("Numero: " + sum([1,2,3,4,5,6]));

function greet (name){
	console.log("Hello Mars! And " + name);
}

function sum (array){
	let count = 0; //para criar variavel -> +/- usado -> variaveis que podem mudar
	var count1 = 0; //para criar uma variavel -> não usado
	const count2 = 0; //para criat uma variavel  -> mais cumon -> variavel constante
 	for (let i = 0; i < array.length; i++){
		count += array[i];
	}
	return count;
}

const n = 42.5; //double
const s = "String"; //String
const b = true; //boolean
const a = null;
const c = undefined;

console.log(Math.floor("Random num: " + Math.random() * 10));

setTimeout( 
  () => console.log("Hello, World"),
  5000
);