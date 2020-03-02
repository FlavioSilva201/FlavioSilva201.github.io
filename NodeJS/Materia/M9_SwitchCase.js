/*
switch (expression) {
  case 1: 
     statements
     break;
  case 2: 
     statements
     break;
  default: 
     statements
     break;
}
*/

console.log("Switch, Case");

const variavel = 2;
switch (variavel) {
    case 1:
        console.log("Se a variavel = 1 entra aqui -> False");
        break; // O Brak para o teste de mais condições 
    case 2:
        console.log("Se a variavel = 2 entra aqui -> True");
        break;
    default:
        console.log("Se todos os outros falharem, entra aqui");
        break;
}