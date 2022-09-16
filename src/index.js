console.clear();
import Phaser from "phaser";

// import favicon from "./Assets/Favicon/favicon.png";
import "./style.css";

// Configs/Infos
import GlobalConfigs from "./Configs";
import packageJson from "../package.json";
import { Banner } from "./Theme";

// Scenes
import Preload from "./Scenes/Preload";
import Index from "./Scenes/Index";
import Start from "./Scenes/Start";
import Options from "./Scenes/Options";
import Pascal, { PascalUI } from "./Scenes/GamePlay/Pascal";
import SnakeAll, { SnakeAllUI } from "./Scenes/GamePlay/SnakeAll";
import Web, { WebUI } from "./Scenes/GamePlay/Web";
import Gaming, { GamingUI } from "./Scenes/GamePlay/Gaming";

const config = {
	title: packageJson.name,
	url: packageJson.homepage,
	version: packageJson.version,
	banner: {
		text: Banner.text,
		background: Banner.background,
		hidePhaser: false
	},
	// Game
	parent: "GameContainer",
	type: Phaser.AUTO,
	width: GlobalConfigs.screen.width,
	height: GlobalConfigs.screen.height,
	backgroundColor: "#757575",
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	transparent: false,
	roundPixels: true,
	render: {
		antialias: true,
		antialiasGL: true,
		pixelArt: false,
	},
	physics: {
		default: "arcade",
		arcade: {
			debug: GlobalConfigs.debug,
			gravity: { x: 0, y: 0 }
		}
	},
	scene: [
		Preload,
		Index,
		Start,
		Options,
		// Game Play
		Pascal, PascalUI,
		SnakeAll, SnakeAllUI,
		Web, WebUI,
		Gaming, GamingUI,
	],
}

const game = new Phaser.Game(config);

// document.getElementById("favicon").setAttribute("href", favicon);
