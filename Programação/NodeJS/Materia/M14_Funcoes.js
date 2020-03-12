//NodeJs é fixe
//JavaScript é fixe

/*
Sintax

function nameFunction() {    
  //code to be executed
}
*/

main(); //Chamar a função

function main() { // sintax e nome da função
    //Bloco de código que será apresentado após a função ser chamada
    console.log("Hello, Hey");
}

//function vs variable:
//function tem ()
//uma variavel não tem ()


console.log("Função com parametros");

sum("Jozé", 2, 3); // Necessario passar os parametros que se pertende que a função receba

function sum(nome, num1, num2) { //A função sum recebe 3 argomentos, neste caso uma String e 2 números
    //Dentro da função pode ser executado praticamente qualquer tipo de código
    const sum = num1 + num2;
    console.log(nome + " a soma de " + num1 + " + " + num2 + " = " + sum);
}

outraFuncao("António ", " Vasco "); //Embora só se passe 2 parametros, a função vai ser chamada na mesma
function outraFuncao(nome1, nome2, nome3) { //Era suposto ter recebido 3 parametros, mas como neste caso só irá receber 2 então o que parametro não recebido, fica como undefined
    console.log("O teu nome é: " + nome1 + nome2 + nome3); //O teu nome é: António  Vasco undefined
}


//Return
console.log("Soma de 2 valoes = " + soma(5, 6)); // Faz print do retorno da função;

/*
const variavelRetornoFuncaoSoma = "Soma de 2 valoes = " + soma(5,6); // é um outro exemplo do sentido o return statement
console.log(variavelRetornoFuncaoSoma);
*/

function soma(num1, num2) {
    const sum = num1 + num2;
    return sum; // retorna a soma dos dois parametros recebidos
    // neste caso como alternativa tambem podia ser apenas -> return num1 + num2; //faz exatamente a mesma coisa
}

//fim