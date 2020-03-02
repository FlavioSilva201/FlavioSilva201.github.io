//Declaração de Arrays

const arr1 = []; //array vazio
const arr2 = [1, 2, 3, 4, 5]; //array de números
const arr3 = ["Index1", "Index2", "Index3"]; //array Strigns
const arr4 = [true, true, false, true]; //array de booleans
const arr5 = [{
        "atributo1.1": "valor1.1",
        "atributo1.2": "valor1.2"
    },
    { "atributo2.1": "valor2.1" }
]; //array objects

const arr6 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12]
]; //array de arrays

const arr7 = ["Index1", 1, true, {
        "atributo1.1": "valor1.1",
        "atributo1.2": "valor1.2"
    },
    [7, 8, 9]
]; //array de varios tipos


console.log("Array1: ");
console.log(arr1);
console.log("---------");
console.log("Array2: ");
console.log(arr2);
console.log("---------");
console.log("Array3: ");
console.log(arr3);
console.log("---------");
console.log("Array4: ");
console.log(arr4);
console.log("---------");
console.log("Array5: ");
console.log(arr5);
console.log("---------");
console.log("Array6: ");
console.log(arr6);
console.log("---------");
console.log("Array7: ");
console.log(arr7);
console.log("---------");
console.log("---------");
console.log("---------");
console.log("---------");

console.log("Acedendo, Alterando e Adicionanado");
let array = ["Preto", "Azul", "Verde", "Castanho", "Vermelho"];
console.log(array);
//
//Valor    -> Posição
//
//Preto    -> 0
//Azul     -> 1
//verde    -> 2
//Castanho -> 3
//Vermelho -> 4

console.log("Aceder á posição 1: " + array[1]);
array[1] = "Roxo"; //Mudifica o array
console.log("A posição 1 foi alterada para: " + array[1]);
array[5] = "Amarelo"; //Adiciona uma nova posição
console.log("Aceder á nova posição adicionada: " + array[5]);
console.log(array);