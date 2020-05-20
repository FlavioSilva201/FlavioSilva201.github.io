// variavel.trim() -> para remover os espaços em branco
import { history } from "./ListaData.js";

const RangeHistory = document.getElementById("RangeHistory");
const ListHistoryTitle = document.getElementById("ListHistoryTitle");
const UlListHistory = document.getElementById("UlListHistory");

main();
function main() {
  document
    .getElementById("InpBirthday")
    .setAttribute("max", `${String(new Date().toISOString().slice(0, 10))}`); // Change limite for today
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
      for (let i = 0; i < yearHistory.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = yearHistory[i];
        UlListHistory.appendChild(li);
      }
      break;

    case 2017:
      yearHistory = indHistorySel._2017;
      for (let i = 0; i < yearHistory.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = yearHistory[i];
        UlListHistory.appendChild(li);
      }
      break;

    case 2018:
      yearHistory = indHistorySel._2018;
      for (let i = 0; i < yearHistory.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = yearHistory[i];
        UlListHistory.appendChild(li);
      }
      break;

    case 2019:
      yearHistory = indHistorySel._2019;
      for (let i = 0; i < yearHistory.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = yearHistory[i];
        UlListHistory.appendChild(li);
      }
      break;

    case 2020:
      yearHistory = indHistorySel._2020;
      for (let i = 0; i < yearHistory.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = yearHistory[i];
        UlListHistory.appendChild(li);
      }
      break;

    default:
      break;
  }
}
