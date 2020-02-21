const SeccaoChacutaria = document.getElementById("SeccaoChacutaria");
const SeccaoFrutaria = document.getElementById("SeccaoFrutaria");
const SeccaoPadaria = document.getElementById("SeccaoPadaria");
const SeccaoPastelaria = document.getElementById("SeccaoPastelaria");
const SeccaoPeixaria = document.getElementById("SeccaoPeixaria");
const SeccaoTalho = document.getElementById("SeccaoTalho");
const SeccaoNome = document.getElementById("SeccaoNome");

let SeccaoEscolhida = 0;

SeccaoChacutaria.addEventListener("click", () => {
    SeccaoEscolhida = 1;
});
SeccaoFrutaria.addEventListener("click", () => {
    SeccaoEscolhida = 2;
});
SeccaoPadaria.addEventListener("click", () => {
    SeccaoEscolhida = 3;
});

SeccaoPastelaria.addEventListener("click", () => {
    SeccaoEscolhida = 4;
});
SeccaoPeixaria.addEventListener("click", () => {
    SeccaoEscolhida = 5;
});
SeccaoTalho.addEventListener("click", () => {
    SeccaoEscolhida = 6;
});