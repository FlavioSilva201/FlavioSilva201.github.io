// variavel.trim() -> para remover os espaços em branco
import { history } from "./ListaData.js";

const RangeHistory = document.getElementById("RangeHistory");
const ListHistoryTitle = document.getElementById("ListHistoryTitle");
const UlListHistory = document.getElementById("UlListHistory");
const Maxdate = document.getElementById("Maxdate");

main();
function main() {
  document
    .getElementById("InpBirthday")
    .setAttribute("max", `${String(new Date().toISOString().slice(0, 10))}`); // Change limite for today
  RangeHistory.max = RangeHistory.value = ListHistoryTitle.innerHTML = Maxdate.innerHTML = new Date().getFullYear();
  changeList();
}

RangeHistory.addEventListener("change", () => {
  ListHistoryTitle.innerHTML = RangeHistory.value;
  while (UlListHistory.firstChild) {
    UlListHistory.removeChild(UlListHistory.firstChild);
  }
  changeList();
});

function changeList() {
  let yearHistory;
  let indHistorySel;

  if (localStorage.getItem("LocalLang") === "English") {
    indHistorySel = history.en;
  } else {
    indHistorySel = history.pt;
  }

  switch (Number(RangeHistory.value)) {
    case 2016:
      yearHistory = indHistorySel._2016;
      showListHistory(yearHistory);
      break;

    case 2017:
      yearHistory = indHistorySel._2017;
      showListHistory(yearHistory);
      break;

    case 2018:
      yearHistory = indHistorySel._2018;
      showListHistory(yearHistory);
      break;

    case 2019:
      yearHistory = indHistorySel._2019;
      showListHistory(yearHistory);
      break;

    case 2020:
      yearHistory = indHistorySel._2020;
      showListHistory(yearHistory);
      break;

    default:
      const li = document.createElement("li");
      li.innerHTML = "Sorry something went wrong!";
      UlListHistory.appendChild(li);
      break;
  }
}

function showListHistory(yearHistory) {
  for (let i = 0; i < yearHistory.length; i++) {
    const li = document.createElement("li");
    li.innerHTML = yearHistory[i];
    UlListHistory.appendChild(li);
  }
}

const bannerConteiner = document.getElementById("bannerConteiner");

document.getElementById("BtnSubmit").addEventListener("click", (event) => {
  event.preventDefault();
  if (!(document.getElementById("firstNome").value === "Flávio")) {
    submitFail("This it's not my first nome");
  } else if (!(document.getElementById("lastNome").value === "Silva")) {
    return submitFail("This it's not my  last nome");
  } else if (
    !(
      document.getElementById("InpEmail").value ===
      "flavioandre.2001.9.7@gmail.com"
    )
  ) {
    return submitFail("This it's not my  email");
  } else if (!(document.getElementById("InpBirthday").value === "2001-08-10")) {
    return submitFail("This it's not my birthday");
  } else if (
    !(document.getElementById("Description").value === "I Love Programming!")
  ) {
    return submitFail("This it's not my description");
  } else if (!document.getElementById("FrontEnd").checked) {
    return submitFail("I prefer FrontEnd");
  } else if (!document.getElementById("html").checked) {
    return submitFail("I know HTML");
  } else if (!document.getElementById("css").checked) {
    return submitFail("I know CSS");
  } else if (!document.getElementById("javascript").checked) {
    return submitFail("I know JavaScript");
  } else if (!document.getElementById("php").checked) {
    return submitFail("I know PHP");
  } else if (!document.getElementById("mysql").checked) {
    return submitFail("I know MySQL");
  } else {
    document.getElementById("BannerText").innerHTML = "It's me Flávio!";
    bannerConteiner.style.backgroundColor = "green";
    bannerConteiner.style.display = "flex";
  }
});

function submitFail(erro) {
  document.getElementById("BannerText").innerHTML = "Some thing wrong: " + erro;
  bannerConteiner.style.backgroundColor = "red";
  bannerConteiner.style.display = "flex";
}
