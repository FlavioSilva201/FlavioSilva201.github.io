import PROJECTS from "./projects.js";

document.getElementById("ImpactoBTN").addEventListener("click", () => changeProject("Impacto"));
document.getElementById("UtilsjsBTN").addEventListener("click", () => changeProject("Utilsjs"));
document.getElementById("RupestreBTN").addEventListener("click", () => changeProject("Rupestre"));
document.getElementById("PlayCodeBTN").addEventListener("click", () => changeProject("PlayCode"));

changeProject("Impacto");
function changeProject(projectName) {
	document.getElementById("ProjectName").innerHTML = PROJECTS[projectName].name;
	document.getElementById("ProjectImg").src = PROJECTS[projectName].image;
	if (localStorage.getItem("LocalLang") === "English") document.getElementById("ProjectDescription").innerHTML = PROJECTS[projectName].description.ing;
	else document.getElementById("ProjectDescription").innerHTML = PROJECTS[projectName].description.pt;
	document.getElementById("ProjectWebSite").src = PROJECTS[projectName].webSite;
	document.getElementById("ProjectSourceCode").src = PROJECTS[projectName].repository;
}
