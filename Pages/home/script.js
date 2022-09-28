main();
function main() {
  getInd();
}

function getInd() {
  let indHistorySel;
  if (localStorage.getItem("LocalLang") === "English") indHistorySel = "EN";
  else indHistorySel = "PT";
  getData(indHistorySel);
}

async function getData(indHistorySel) {
  await fetch(`../../Languages/Data/Home/${indHistorySel}.json`)
    .then(response => response.json())
    .then(data => indHistorySel = data);
  changeDom(indHistorySel);
}

function changeDom(indHistorySel) {
  document.getElementById("MyDescription").innerHTML = indHistorySel.Description;
  document.getElementById("NameLanguage").innerHTML = indHistorySel.Name;
  document.getElementById("DatailsLanguage").innerHTML = indHistorySel.Details;
  document.getElementById("FavoriteAreaLanguage").innerHTML = indHistorySel.Skills[0];
  document.getElementById("SkillsDiscoveredLanguage").innerHTML = indHistorySel.Skills[1];
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

function submitFail(error) {
  document.getElementById("BannerText").innerHTML = "Some thing wrong: " + error;
  bannerConteiner.style.backgroundColor = "red";
  bannerConteiner.style.display = "flex";
}
