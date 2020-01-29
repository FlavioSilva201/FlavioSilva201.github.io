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

const IndiomaSlect = document.getElementById("IndiomaSlect");
const user_label = document.getElementById("user-label");
/*
user_label
result_p
BtnReset
*/

main();

IndiomaSlect.onchange = function function1() {
    functionIndioma();
};

function functionIndioma() {
    var i = IndiomaSlect.selectedIndex;
    //alert(IndiomaSlect.options[i].text);
    console.log(IndiomaSlect.options[i].text);
    user_label.style.left = "-50px";
    switch (IndiomaSlect.value) {
        case "Alemao":
            user_label.innerHTML = "Spieler";
            result_p.innerHTML = "Treffen Sie Ihre Wahl";
            BtnReset.innerHTML = "Fange von vorne an";
            break;
        case "Arabe":
            user_label.innerHTML = "لاعب";
            result_p.innerHTML = "جعل اختيارك";
            BtnReset.innerHTML = "البدء من جديد";
            break;
        case "Chines":
            user_label.innerHTML = "播放器";
            result_p.innerHTML = "做出选择";
            BtnReset.innerHTML = "重新开始";
            break;
        case "Espanhol":
            user_label.innerHTML = "Jugador";
            result_p.innerHTML = "Haz tu elección";
            BtnReset.innerHTML = "Empezar de nuevo";
            break;
        case "Frances":
            user_label.innerHTML = "Joueur";
            result_p.innerHTML = "Faites votre choix";
            BtnReset.innerHTML = "Recommencer";
            break;
        case "Grego":
            user_label.innerHTML = "Παίκτης";
            result_p.innerHTML = "Κάντε την επιλογή σας";
            BtnReset.innerHTML = "Ξεκινήστε πάλι";
            break;
        case "Ingles":
            user_label.innerHTML = "Player";
            result_p.innerHTML = "Make Your Choice";
            BtnReset.innerHTML = "Restart";
            break;
        case "Japones":
            user_label.innerHTML = "プレイヤー";
            result_p.innerHTML = "あなたの選択をしなさい";
            BtnReset.innerHTML = "やり直す";
            break;
        case "Latim":
            user_label.innerHTML = "Ludio";
            result_p.innerHTML = "Fac tua elegit";
            BtnReset.innerHTML = "Per initio";
            break;
        case "Luxemburgues":
            user_label.innerHTML = "Spillerinne";
            result_p.innerHTML = "Maacht Äre Choix";
            BtnReset.innerHTML = "Start iwwer";
            break;
        case "Mongol":
            user_label.innerHTML = "Тоглогч";
            result_p.innerHTML = "Та сонголтоо хий";
            BtnReset.innerHTML = "Эхнээс нь эхлэх";
            break;
        case "Polaco":
            user_label.innerHTML = "Gracz";
            result_p.innerHTML = "Dokonaj wyboru";
            BtnReset.innerHTML = "Zacznij od nowa";
            break;
        case "Russo":
            user_label.innerHTML = "игрок";
            result_p.innerHTML = "Сделай свой выбор";
            BtnReset.innerHTML = "Начать сначала";
            break;
        case "Ucraniano":
            user_label.innerHTML = "Гравець";
            result_p.innerHTML = "Зробіть свій вибір";
            BtnReset.innerHTML = "Почніть спочатку";
            break;
        case "Vietenamita":
            user_label.style.left = "-100px";
            user_label.innerHTML = "Máy nghe nhạc";
            result_p.innerHTML = "Lựa chọn của bạn";
            BtnReset.innerHTML = "Bắt đầu lại";
            break;
        default:
            user_label.innerHTML = "Jogador";
            result_p.innerHTML = "Faz a Tua Escolha";
            BtnReset.innerHTML = "Recomeçar";
            break;
    }
}

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

    BtnReset.addEventListener("click", function() {
        console.log("Reset");
        userScore = 0;
        computerScore = 0;
        userScore_span.innerHTML = userScore;
        computerScore_span.innerHTML = computerScore;
        functionIndioma();
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

    switch (IndiomaSlect.value) {
        case "Alemao":
            result_p.innerHTML = convertToWord(userChoice) + " < Sieg > " + convertToWord(computerChoice);
            break;
        case "Arabe":
            result_p.innerHTML = convertToWord(userChoice) + " < فوز > " + convertToWord(computerChoice);
            break;
        case "Chines":
            result_p.innerHTML = convertToWord(userChoice) + " < 胜利的 > " + convertToWord(computerChoice);
            break;
        case "Espanhol":
            result_p.innerHTML = convertToWord(userChoice) + " < Victoria > " + convertToWord(computerChoice);
            break;
        case "Frances":
            result_p.innerHTML = convertToWord(userChoice) + " < Victoire > " + convertToWord(computerChoice);
            break;
        case "Grego":
            result_p.innerHTML = convertToWord(userChoice) + " < Νίκη > " + convertToWord(computerChoice);
            break;
        case "Ingles":
            result_p.innerHTML = convertToWord(userChoice) + " < Victory > " + convertToWord(computerChoice);
            break;
        case "Japones":
            result_p.innerHTML = convertToWord(userChoice) + " < 勝利 > " + convertToWord(computerChoice);
            break;
        case "Latim":
            result_p.innerHTML = convertToWord(userChoice) + " < Victoria > " + convertToWord(computerChoice);
            break;
        case "Luxemburgues":
            result_p.innerHTML = convertToWord(userChoice) + " < Victoire > " + convertToWord(computerChoice);
            break;
        case "Mongol":
            result_p.innerHTML = convertToWord(userChoice) + " < Ялалт > " + convertToWord(computerChoice);
            break;
        case "Polaco":
            result_p.innerHTML = convertToWord(userChoice) + " < Zwycięstwo > " + convertToWord(computerChoice);
            break;
        case "Russo":
            result_p.innerHTML = convertToWord(userChoice) + " < победа > " + convertToWord(computerChoice);
            break;
        case "Ucraniano":
            result_p.innerHTML = convertToWord(userChoice) + " < Перемога > " + convertToWord(computerChoice);
            break;
        case "Vietenamita":
            result_p.innerHTML = convertToWord(userChoice) + " < Vẽ > " + convertToWord(computerChoice);
            break;
        default:
            result_p.innerHTML = convertToWord(userChoice) + " < VITÓRIA > " + convertToWord(computerChoice);
            break;
    }

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

    switch (IndiomaSlect.value) {
        case "Alemao":
            result_p.innerHTML = convertToWord(userChoice) + " < Niederlage > " + convertToWord(computerChoice);
            break;
        case "Arabe":
            result_p.innerHTML = convertToWord(userChoice) + " < هزيمة > " + convertToWord(computerChoice);
            break;
        case "Chines":
            result_p.innerHTML = convertToWord(userChoice) + " < 打败 > " + convertToWord(computerChoice);
            break;
        case "Espanhol":
            result_p.innerHTML = convertToWord(userChoice) + " < Derrota > " + convertToWord(computerChoice);
            break;
        case "Frances":
            result_p.innerHTML = convertToWord(userChoice) + " < Vaincre > " + convertToWord(computerChoice);
            break;
        case "Grego":
            result_p.innerHTML = convertToWord(userChoice) + " < Νίκη > " + convertToWord(computerChoice);
            break;
        case "Ingles":
            result_p.innerHTML = convertToWord(userChoice) + " < Defeat > " + convertToWord(computerChoice);
            break;
        case "Japones":
            result_p.innerHTML = convertToWord(userChoice) + " < 倒す > " + convertToWord(computerChoice);
            break;
        case "Latim":
            result_p.innerHTML = convertToWord(userChoice) + " < Cladem > " + convertToWord(computerChoice);
            break;
        case "Luxemburgues":
            result_p.innerHTML = convertToWord(userChoice) + " < Néierlag > " + convertToWord(computerChoice);
            break;
        case "Mongol":
            result_p.innerHTML = convertToWord(userChoice) + " < Ялагдал > " + convertToWord(computerChoice);
            break;
        case "Polaco":
            result_p.innerHTML = convertToWord(userChoice) + " < Porażka > " + convertToWord(computerChoice);
            break;
        case "Russo":
            result_p.innerHTML = convertToWord(userChoice) + " < поражение > " + convertToWord(computerChoice);
            break;
        case "Ucraniano":
            result_p.innerHTML = convertToWord(userChoice) + " < Поразка > " + convertToWord(computerChoice);
            break;
        case "Vietenamita":
            result_p.innerHTML = convertToWord(userChoice) + " < Thất bại > " + convertToWord(computerChoice);
            break;
        default:
            result_p.innerHTML = convertToWord(userChoice) + " < DEROTA > " + convertToWord(computerChoice);
            break;
    }

    document.getElementById(userChoice).classList.add("red-glow");
    setTimeout(function() {
        document.getElementById(userChoice).classList.remove("red-glow")
    }, 500);
}

function draw(userChoice, computerChoice) {
    console.log("Draw");

    switch (IndiomaSlect.value) {
        case "Alemao":
            result_p.innerHTML = convertToWord(userChoice) + " < Zeichnen > " + convertToWord(computerChoice);
            break;
        case "Arabe":
            result_p.innerHTML = convertToWord(userChoice) + " < رسم > " + convertToWord(computerChoice);
            break;
        case "Chines":
            result_p.innerHTML = convertToWord(userChoice) + " < 抽奖 > " + convertToWord(computerChoice);
            break;
        case "Espanhol":
            result_p.innerHTML = convertToWord(userChoice) + " < Dibujar > " + convertToWord(computerChoice);
            break;
        case "Frances":
            result_p.innerHTML = convertToWord(userChoice) + " < Dessiner > " + convertToWord(computerChoice);
            break;
        case "Grego":
            result_p.innerHTML = convertToWord(userChoice) + " < Σχεδιάστε > " + convertToWord(computerChoice);
            break;
        case "Ingles":
            result_p.innerHTML = convertToWord(userChoice) + " < Draw > " + convertToWord(computerChoice);
            break;
        case "Japones":
            result_p.innerHTML = convertToWord(userChoice) + " < 描く > " + convertToWord(computerChoice);
            break;
        case "Latim":
            result_p.innerHTML = convertToWord(userChoice) + " < Trahere > " + convertToWord(computerChoice);
            break;
        case "Luxemburgues":
            result_p.innerHTML = convertToWord(userChoice) + " < Zeechnen > " + convertToWord(computerChoice);
            break;
        case "Mongol":
            result_p.innerHTML = convertToWord(userChoice) + " < Зурах > " + convertToWord(computerChoice);
            break;
        case "Polaco":
            result_p.innerHTML = convertToWord(userChoice) + " < Rysuj > " + convertToWord(computerChoice);
            break;
        case "Russo":
            result_p.innerHTML = convertToWord(userChoice) + " < рисовать > " + convertToWord(computerChoice);
            break;
        case "Ucraniano":
            result_p.innerHTML = convertToWord(userChoice) + " < Малюємо > " + convertToWord(computerChoice);
            break;
        case "Vietenamita":
            result_p.innerHTML = convertToWord(userChoice) + " < Chiến thắng > " + convertToWord(computerChoice);
            break;
        default:
            result_p.innerHTML = convertToWord(userChoice) + " < EMPATE > " + convertToWord(computerChoice);
            break;
    }

    document.getElementById(userChoice).classList.add("orange-glow");
    setTimeout(function() {
        document.getElementById(userChoice).classList.remove("orange-glow");
    }, 500);
}

function convertToWord(letter) {
    switch (IndiomaSlect.value) {
        case "Alemao":
            if (letter == "r") return "Stein";
            if (letter == "p") return "Papier";
            if (letter == "s") return "Schere";
            break;
        case "Arabe":
            if (letter == "r") return "حجر";
            if (letter == "p") return "ورقة";
            if (letter == "s") return "مقص";
            break;
        case "Chines":
            if (letter == "r") return "石材";
            if (letter == "p") return "纸类";
            if (letter == "s") return "剪刀类";
            break;
        case "Espanhol":
            if (letter == "r") return "Piedra";
            if (letter == "p") return "Papel";
            if (letter == "s") return "Tijeras";
            break;
        case "Frances":
            if (letter == "r") return "Pierre";
            if (letter == "p") return "Le papier";
            if (letter == "s") return "Des ciseaux";
            break;
        case "Grego":
            if (letter == "r") return "Stone";
            if (letter == "p") return "Χαρτί";
            if (letter == "s") return "Ψαλίδι";
            break;
        case "Ingles":
            if (letter == "r") return "Rock";
            if (letter == "p") return "Paper";
            if (letter == "s") return "Scissors";
            break;
        case "Japones":
            if (letter == "r") return "ストーン";
            if (letter == "p") return "紙";
            if (letter == "s") return "はさみ";
            break;
        case "Latim":
            if (letter == "r") return "lapis";
            if (letter == "p") return "chartam";
            if (letter == "s") return "forceps";
            break;
        case "Luxemburgues":
            if (letter == "r") return "Steng";
            if (letter == "p") return "Pabeier";
            if (letter == "s") return "Schéier";
            break;
        case "Mongol":
            if (letter == "r") return "Чулуу";
            if (letter == "p") return "Цаас";
            if (letter == "s") return "Хайч";
        case "Polaco":
            if (letter == "r") return "Kamień";
            if (letter == "p") return "Papier";
            if (letter == "s") return "Nożyczki";
            break;
        case "Russo":
            if (letter == "r") return "камень";
            if (letter == "p") return "бумага";
            if (letter == "s") return "ножницы";
            break;
        case "Ucraniano":
            if (letter == "r") return "Камінь";
            if (letter == "p") return "Папір";
            if (letter == "s") return "Ножиці";
            break;
        case "Vietenamita":
            if (letter == "r") return "Đá";
            if (letter == "p") return "Giấy";
            if (letter == "s") return "Kéo";
            break;
        default:
            if (letter == "r") return "Pedra";
            if (letter == "p") return "Papel";
            if (letter == "s") return "Tesoura";
            break;
    }
}