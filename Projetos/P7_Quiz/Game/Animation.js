import { perguntas } from './PerguntasFile.js';

const NumeroPerguntasP = document.getElementById("NumeroPerguntasP");
const certosP = document.getElementById("certosP");
const errosP = document.getElementById("errosP");
const ComboP = document.getElementById("ComboP");
const AjudasP = document.getElementById("AjudasP");
const PontosP = document.getElementById("PontosP");

const button = document.getElementsByTagName("button");

const Pergunta = document.getElementById("Pergunta");
const Opcao1 = document.getElementById("Opcao1");
const Opcao2 = document.getElementById("Opcao2");
const Opcao3 = document.getElementById("Opcao3");
const Opcao4 = document.getElementById("Opcao4");



let errorScore = 0;
let questionIndex = 0;
let CertosScore = 0;
let questionCounter = 0;
let ComboVar = 1;
let AjudasVar = 3;
let PontosVar = 0;

startGame();

function startGame() {
    questionCounter = 1;
    CertosScore = 0;
    errorScore = 0;
    ComboVar = 1;
    AjudasVar = 3;
    PontosVar = 0;

    certosP.innerHTML = "Certos: " + CertosScore;
    errosP.innerHTML = "Errados: " + errorScore;
    ComboP.innerHTML = "Combo: " + ComboVar;
    AjudasP.innerHTML = "Ajudas: " + AjudasVar;
    PontosP.innerHTML = "Pontos: " + PontosVar;
    NumeroPerguntasP.innerHTML = "Pergunta Atual: " + questionCounter;
    getNewQuestions();
};

function getNewQuestions() {
    questionIndex = Math.floor(Math.random() * perguntas.length);
    console.log(questionIndex);
    Pergunta.innerHTML = perguntas[questionIndex].pergunta;
    Opcao1.innerHTML = perguntas[questionIndex].resposta1;
    Opcao2.innerHTML = perguntas[questionIndex].resposta2;
    Opcao3.innerHTML = perguntas[questionIndex].resposta3;
    Opcao4.innerHTML = perguntas[questionIndex].resposta4;
};

function checkRight(userEscolha) {
    for (let j = 0; j < button.length; j++) {
        button[j].disabled = true;
    }
    setTimeout(
        function() {

            for (let i = 0; i < button.length; i++) {
                button[i].disabled = false;
                if (userEscolha == perguntas[questionIndex].solucao) {
                    button[i].classList.remove("ColorBgGreen");
                    button[i].classList.add("ColorBgGreen");
                } else {
                    button[i].classList.remove("ColorBgGreen");
                    button[i].classList.add("ColorBgRed");
                }
            }

            if (userEscolha == perguntas[questionIndex].solucao) {
                console.log("Certo");
                CertosScore++;
                ComboVar++;
                PontosVar = PontosVar + 100 * ComboVar;
                certosP.innerHTML = "Certos: " + CertosScore;
                PontosP.innerHTML = "Pontos: " + PontosVar;
            } else {
                console.log("Errado");
                ComboVar = 1;
                errorScore++;
                errosP.innerHTML = "Errados: " + errorScore;
            }

            questionCounter++;
            NumeroPerguntasP.innerHTML = "Pergunta Atual: " + questionCounter;
            ComboP.innerHTML = "Combo: " + ComboVar;

            if (questionCounter > 30) {

                for (let j = 0; j < button.length; j++) {
                    button[j].disabled = true;
                };

                swal("Parabéns", "Acabaste o Quiz!!", "success").then((nada) => {
                    swal({
                        title: "Confirmação",
                        text: "Conseguiste pontos: " + PontosVar,
                        icon: "info"
                    })
                });

                console.log("Nome:" + nomeUser);
                console.log("Pontos:" + PontosVar);

            } else {
                getNewQuestions();
            }
        },
        500
    );
}

button[0].addEventListener(
    "click",
    () => {
        console.log("A");
        checkRight("A");
    });

button[1].addEventListener(
    "click",
    () => {
        console.log("B");
        checkRight("B");
    });

button[2].addEventListener(
    "click",
    () => {
        console.log("C");
        checkRight("C");
    });

button[3].addEventListener(
    "click",
    () => {
        console.log("D");
        checkRight("D");
    });

button[4].addEventListener(
    "click",
    () => {
        if (AjudasVar > 0) {
            swal("Resposta: " + perguntas[questionIndex].solucao);
            AjudasVar--;
            AjudasP.innerHTML = "Ajudas: " + AjudasVar;
        } else {
            alert("Não tens mais ajudas!");
        }
    });