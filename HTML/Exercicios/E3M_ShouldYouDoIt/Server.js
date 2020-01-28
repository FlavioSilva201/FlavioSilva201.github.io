const formElement = document.getElementById("form");

let allAnswers = [];
fetch("https://shouldyoudoit.herokuapp.com/all").then((response) => {
    response.json().then((data) => {
        allAnswers = data;
    });
});

// fetch("https://shouldyoudoit.herokuapp.com/all").then(function(response) {
//     response.json().then(function(data) {
//         allAnswers = data;
//     });
// });



formElement.addEventListener('submit', function(event) {
    event.preventDefault();

    if (allAnswers.length > 0) {

        const textBox = document.getElementById("TextSearch");

        if (textBox.value.trim() !== "") {
            const answer = document.getElementById("PDecision");
            const gitImage = document.getElementById("ImagemGif");
            const position = Math.floor(Math.random() * allAnswers.length);

            answer.innerHTML = "Loading...";

            const mensagem = allAnswers[position].msg;
            const img = allAnswers[position].img;

            answer.innerHTML = mensagem;
            gitImage.src = img;

            textBox.value = "";
        } else {
            const error = document.getElementById("error");
            error.innerHTML = "Campo Vazio!"
        }
    }
});