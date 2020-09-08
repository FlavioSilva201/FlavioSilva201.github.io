import Projects from "./Projects.js";

const ProjectName = document.getElementById("ProjectName");
const ProjectImg = document.getElementById("ProjectImg");
const ProjectDescription = document.getElementById("ProjectDescription");
const ProjectWebSite = document.getElementById("ProjectWebSite");
const ProjectSourceCode = document.getElementById("ProjectSourceCode");

document.getElementById("SitesPorreirosBTN").addEventListener("click", () => {
	ProjectName.innerHTML = Projects.SitesPorreiros.name;
	ProjectImg.src = Projects.SitesPorreiros.img.src;
	ProjectImg.alt = Projects.SitesPorreiros.img.alt;
	if (localStorage.getItem("LocalLang") === "English") ProjectDescription.innerHTML = Projects.SitesPorreiros.decription.ing;
	else ProjectDescription.innerHTML = Projects.SitesPorreiros.decription.pt;
	ProjectWebSite.src = Projects.SitesPorreiros.webSite;
	ProjectSourceCode.src = Projects.SitesPorreiros.repository;
});

document.getElementById("VanillaJavaScriptBTN").addEventListener("click", () => {
	ProjectName.innerHTML = Projects.VanillaJavaScript.name;
	ProjectImg.src = Projects.VanillaJavaScript.img.src;
	ProjectImg.alt = Projects.VanillaJavaScript.img.alt;
	if (localStorage.getItem("LocalLang") === "English") ProjectDescription.innerHTML = Projects.VanillaJavaScript.decription.ing;
	else ProjectDescription.innerHTML = Projects.VanillaJavaScript.decription.pt;
	ProjectWebSite.src = Projects.VanillaJavaScript.webSite;
	ProjectSourceCode.src = Projects.VanillaJavaScript.repository;
});

document.getElementById("CarteiraOnlineBTN").addEventListener("click", () => {
	ProjectName.innerHTML = Projects.CarteiraOnline.name;
	ProjectImg.src = Projects.CarteiraOnline.img.src;
	ProjectImg.alt = Projects.CarteiraOnline.img.alt;
	if (localStorage.getItem("LocalLang") === "English") ProjectDescription.innerHTML = Projects.CarteiraOnline.decription.ing;
	else ProjectDescription.innerHTML = Projects.CarteiraOnline.decription.pt;
	ProjectWebSite.src = Projects.CarteiraOnline.webSite;
	ProjectSourceCode.src = Projects.CarteiraOnline.repository;
});

document.getElementById("CSSFreeStyleBTN").addEventListener("click", () => {
	ProjectName.innerHTML = Projects.CSSFreeStyle.name;
	ProjectImg.src = Projects.CSSFreeStyle.img.src;
	ProjectImg.alt = Projects.CSSFreeStyle.img.alt;
	if (localStorage.getItem("LocalLang") === "English") ProjectDescription.innerHTML = Projects.CSSFreeStyle.decription.ing;
	else ProjectDescription.innerHTML = Projects.CSSFreeStyle.decription.pt;
	ProjectWebSite.src = Projects.CSSFreeStyle.webSite;
	ProjectSourceCode.src = Projects.CSSFreeStyle.repository;
});
