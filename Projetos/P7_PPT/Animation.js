let userScore = 0;
let computerScore = 0;

const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");

const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result p");

const rock_Div = document.getElementById("r");
const paper_Div = document.getElementById("p");
const scissors_Div = document.getElementById("s");

const BtnReset = document.getElementById("BtnReset");

main();



function main() {
    rock_Div.addEventListener("click", function() {
        console.log("Rock");
        game("r");
    })

    paper_Div.addEventListener("click", function() {
        console.log("Paper");
        game("p");
    })

    scissors_Div.addEventListener("click", function() {
        console.log("Scissors");
        game("s");
    })

    BtnReset.addEventListener("click", function() {
        console.log("Reset");
        userScore = 0;
        computerScore = 0;
        userScore_span.innerHTML = userScore;
        computerScore_span.innerHTML = computerScore;
    })
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
    result_p.innerHTML = convertToWord(userChoice) + " < VENCEU > " + convertToWord(computerChoice);
    document.getElementById(userChoice).classList.add("green-glow");
    setTimeout(function() {
        document.getElementById(userChoice).classList.remove("green-glow")
    }, 500);
}

function lose(userChoice, computerChoice) {
    console.log("User lose");
    computerScore++;
    console.log("Pontos do Computer -> " + computerScore);
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = convertToWord(userChoice) + " < PERDESTE > " + convertToWord(computerChoice);
    document.getElementById(userChoice).classList.add("red-glow");
    setTimeout(function() {
        document.getElementById(userChoice).classList.remove("red-glow")
    }, 500);
}

function draw(userChoice, computerChoice) {
    console.log("Draw");
    result_p.innerHTML = convertToWord(userChoice) + " < EMPATE > " + convertToWord(computerChoice);
    document.getElementById(userChoice).classList.add("orange-glow");
    setTimeout(function() {
        document.getElementById(userChoice).classList.remove("orange-glow")
    }, 500);
}

function convertToWord(letter) {
    if (letter == "r") return "Pedra";
    if (letter == "p") return "Papel";
    if (letter == "s") return "Tesoura";
}