// Tab Separadores
const tabTitlesDescription = document.getElementById("tabTitlesDescription");
const tabTitlesSN = document.getElementById("tabTitlesSN");

// Conteudos, descrição ou Links
const tabConteudoDescription = document.getElementById("tabConteudoDescription");
const tabConteudoSN = document.getElementById("tabConteudoSN");

tabTitlesDescription.addEventListener("click", () => {
    tabTitlesDescription.classList.add("SelectedTab");
    tabTitlesSN.classList.remove("SelectedTab");
    tabConteudoDescription.style.display = "block";
    tabConteudoSN.style.display = "none";
});

tabTitlesSN.addEventListener("click", () => {
    tabTitlesSN.classList.add("SelectedTab");
    tabTitlesDescription.classList.remove("SelectedTab");
    tabConteudoSN.style.display = "flex";
    tabConteudoDescription.style.display = "none";
});


// Btns
const SNLeft = document.getElementById("SNLeft");
const SNRight = document.getElementById("SNRight");

const SocNets = document.getElementsByClassName("SocNets"); // links
let SocNetsSelected = 0;


SNLeft.addEventListener("click", () => {
    SocNets[SocNetsSelected].classList.remove("SocialSelected");
    SocNetsSelected--;
    if (SocNetsSelected < 0) {
        SocNetsSelected = SocNets.length - 1;
    }
    SocNets[SocNetsSelected].classList.add("SocialSelected");
});

SNRight.addEventListener("click", () => {
    SocNets[SocNetsSelected].classList.remove("SocialSelected");
    SocNetsSelected++;
    if (SocNetsSelected > SocNets.length - 1) {
        SocNetsSelected = 0;
    }
    SocNets[SocNetsSelected].classList.add("SocialSelected");
});