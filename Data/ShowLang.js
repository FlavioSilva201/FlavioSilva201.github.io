const ind = ["English", "Portugues"];

const IndiomaSlect = document.getElementById("IndiomaSlect");
const modalDialog = document.getElementById("Modal");

let indiomaDef = ind.Ingles;

document.getElementById("BTN_settings").addEventListener("click", () => {
  modalDialog.showModal();
  modalDialog.style.display = "flex";
});
document.getElementById("BTN_Close").addEventListener("click", () => {
  modalDialog.close();
  modalDialog.style.display = "none";
});

main();
function main() {
  for (let i = 0; i < ind.length; i++) {
    const el = document.createElement("option");
    el.textContent = ind[i];
    el.value = ind[i];
    if (!localStorage.getItem("LocalLang")) {
      if (ind[i] == "English") {
        el.selected = "selected";
        localStorage.setItem("LocalLang", "English");
      }
    } else {
      if (ind[i] == localStorage.getItem("LocalLang")) {
        el.selected = "selected";
        localStorage.setItem("LocalLang", localStorage.getItem("LocalLang"));
      }
    }
    IndiomaSlect.appendChild(el);
  }
}

IndiomaSlect.onchange = function function1() {
  if (IndiomaSlect.value === "English") {
    indiomaDef = ind.Ingles;
    localStorage.setItem("LocalLang", "English");
  } else {
    indiomaDef = ind.Portugues;
    localStorage.setItem("LocalLang", "Portugues");
  }
  location.reload();
};
