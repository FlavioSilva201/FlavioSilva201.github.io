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
		.then(data => changeDom(data));

}

function changeDom(gamesDescription) {
	document.getElementById("FireCosmos").innerHTML = gamesDescription.FireCosmos;
	document.getElementById("SuperBoxJump").innerHTML = gamesDescription.SuperBoxJump;
	document.getElementById("201flaviosilva").innerHTML = gamesDescription["201flaviosilva"];
	document.getElementById("MinderShooter").innerHTML = gamesDescription.MinderShooter;
}
