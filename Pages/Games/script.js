main();
function main() {
	let indHistorySel;
	if (localStorage.getItem("LocalLang") === "English") indHistorySel = "EN";
	else indHistorySel = "PT";
	getData(indHistorySel);
}

async function getData(indHistorySel) {
	await fetch(`../../Languages/Data/Game/${indHistorySel}.json`)
		.then(response => response.json())
		.then(data => indHistorySel = data);
	changeDom(indHistorySel);
}

function changeDom(indHistorySel) {
	document.getElementById("Magito").innerHTML = indHistorySel.Magito;
	document.getElementById("TicTacToe").innerHTML = indHistorySel.TicTacToe;
	document.getElementById("SitesPorreiros").innerHTML = indHistorySel.SitesPorreiros;
	document.getElementById("JoguinhosWeb").innerHTML = indHistorySel.JoguinhosWeb;
	document.getElementById("PlanetaGames").innerHTML = indHistorySel.PlanetaGames;
	document.getElementById("InvasoresDoEspaco").innerHTML = indHistorySel.InvasoresDoEspaco;
}