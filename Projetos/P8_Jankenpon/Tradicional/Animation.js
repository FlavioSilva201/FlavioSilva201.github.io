let userScore = 0;
let computerScore = 0;

const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");

const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result p");

const rock_Div = document.getElementById("r");
const paper_Div = document.getElementById("p");
const scissors_Div = document.getElementById("s");

//cpu

const rockcpu_Div = document.getElementById("rcpu");
const papercpu_Div = document.getElementById("pcpu");
const scissorscpu_Div = document.getElementById("scpu");

const BtnReset = document.getElementById("BtnReset");

const user_label = document.getElementById("user-label");


main();

function main() {
    rock_Div.addEventListener("click", function() {
        console.log("Rock");
        game("r");
    });

    paper_Div.addEventListener("click", function() {
        console.log("Paper");
        game("p");
    });

    scissors_Div.addEventListener("click", function() {
        console.log("Scissors");
        game("s");
    });

    user_label.addEventListener("click", function() {
        const nomeJogador = prompt("Nome de Jogador:", "Jogador");
        nomeJogador == "" ? alert("Tens que por um nome!") : user_label.innerHTML = nomeJogador;

    });

    BtnReset.addEventListener("click", function() {
        console.log("Reset");
        userScore = 0;
        computerScore = 0;
        userScore_span.innerHTML = userScore;
        computerScore_span.innerHTML = computerScore;
    });


}

function getComputerChoice() {
    const choices = ["r", "p", "s"];
    return choices[Math.floor(Math.random() * 3)];
}

function game(userChoice) {
    const computerChoice = getComputerChoice();
    console.log(" User =>" + userChoice);
    console.log(" Computer =>" + computerChoice);
    switch (userChoice + computerChoice) {
        case "sp":
        case "pr":
        case "rs":
            win(userChoice, computerChoice);
            console.log("User Win");
            break;
        case "ps":
        case "rp":
        case "sr":
            lose(userChoice, computerChoice);
            console.log("User Lose");
            break;
        default:
            draw(userChoice, computerChoice);
            console.log("Draw");
            break;
    }
}

function win(userChoice, computerChoice) {
    console.log("User win");
    userScore++;
    console.log("Pontos do User -> " + userScore);
    userScore_span.innerHTML = userScore;
    result_p.innerHTML = convertToWord(userChoice) + " > VITÓRIA > " + convertToWord(computerChoice);

    cpuChoice(computerChoice).classList.add("red-glow"); //add cor vermelha cpu
    document.getElementById(userChoice).classList.add("green-glow"); //add cor verde user
    setTimeout(function() {
        document.getElementById(userChoice).classList.remove("green-glow"); //remove cor verde user
        cpuChoice(computerChoice).classList.remove("red-glow"); //remove cor vermelha cpu
    }, 500);
}

function lose(userChoice, computerChoice) {
    console.log("User lose");
    computerScore++;
    console.log("Pontos do Computer -> " + computerScore);
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = convertToWord(userChoice) + " < DEROTA < " + convertToWord(computerChoice);

    cpuChoice(computerChoice).classList.add("green-glow"); //add cor verde cpu
    document.getElementById(userChoice).classList.add("red-glow"); //add cor vermelha user
    setTimeout(function() {
        document.getElementById(userChoice).classList.remove("red-glow"); //remove cor vermelha user
        cpuChoice(computerChoice).classList.remove("green-glow"); //remove cor verde cpu
    }, 500);
}

function draw(userChoice, computerChoice) {
    console.log("Draw");
    result_p.innerHTML = convertToWord(userChoice) + " = EMPATE = " + convertToWord(computerChoice);

    cpuChoice(computerChoice).classList.add("orange-glow"); //add cor laranja cpu
    document.getElementById(userChoice).classList.add("orange-glow"); //add cor laranja user
    setTimeout(function() {
        document.getElementById(userChoice).classList.remove("orange-glow"); //remove cor laranja user
        cpuChoice(computerChoice).classList.remove("orange-glow"); //remove cor laranja cpu
    }, 500);
}

function convertToWord(letter) {
    if (letter == "r") return "Pedra"; //rock
    if (letter == "p") return "Papel"; //pepar
    if (letter == "s") return "Tesoura"; //scissors
}

function cpuChoice(computerChoice) {
    if (computerChoice == "r") return rockcpu_Div; //rock
    if (computerChoice == "p") return papercpu_Div; //pepar
    if (computerChoice == "s") return scissorscpu_Div; //scissors
}