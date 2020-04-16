const DataLogin = document.getElementById("DataLogin");
const linha = document.getElementsByClassName("linha");
const commandRight = document.getElementsByClassName("commandRight");
const answerUser = document.getElementsByClassName("answerUser");
const answer = document.getElementsByClassName("answer");

const DotsGL = document.getElementById("DotsGL");
const RedirectingTime = document.getElementById("RedirectingTime");

let counter = 0;

main()

function main() {
    DataLogin.innerHTML = new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + " - ";
    linha[0].style.visibility = "visible";
    linha[1].style.visibility = "visible";
}

const timer = setInterval(LinesShow, 500);

function LinesShow() {
    counter++;
    console.log(counter);
    switch (counter) {
        case 1:
            commandRight[0].style.visibility = "visible";
            break;
        case 2:
            answerUser[0].style.visibility = "visible";
            linha[2].style.visibility = "visible";
            linha[3].style.visibility = "visible";
            break;
        case 3:
            commandRight[1].style.visibility = "visible";
            break;
        case 4:
            answerUser[1].style.visibility = "visible";
            break;
        case 5:
            answer[0].style.visibility = "visible";
            break;
        case 6:
            answerUser[2].style.visibility = "visible";
            break;
        case 7:
            answer[1].style.visibility = "visible";
            break;
        case 8:
            answer[2].style.visibility = "visible";
            break;
        case 9:
        case 10:
        case 11:
        case 12:
            DotsGL.style.visibility = "visible";
            DotsGL.innerHTML += ".";
            break;
        case 13:
            answer[3].style.visibility = "visible";
            break;
        case 14:
            answer[4].style.visibility = "visible";
            RedirectingTime.style.visibility = "visible";
            break;
        case 15:
        case 16:
            RedirectingTime.innerHTML = "4";
            break;
        case 17:
        case 18:
            RedirectingTime.innerHTML = "3";
            break;
        case 19:
        case 20:
            RedirectingTime.innerHTML = "2";
            break;
        case 21:
        case 22:
            RedirectingTime.innerHTML = "1";
            break;
        case 23:
        case 24:
            RedirectingTime.innerHTML = "0";
            break;
        default:
            clearInterval(timer);
            // location.replace("./Pages/home/home.html");
            break;
    }
}