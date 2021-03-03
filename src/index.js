import Phaser from "Phaser";

import "./CSS/Reset.css";
import favicon from "./Assets/Favicon/favicon.png";

// Configs/Infos
import GlobalConfigs from "./Config/Configs";
import packageJson from "../package.json";
import { Banner } from "./Theme";

// Scenes
import Preload from "./Scenes/Preload";
import Home from "./Scenes/Home";
import Start from "./Scenes/Start";

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
	backgroundColor: "#000",
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	transparent: false,
	antialias: true,
	pixelArt: false,
	roundPixels: true,
	physics: {
		default: "arcade",
		arcade: {
			debug: GlobalConfigs.debug,
			gravity: { x: 0, y: 100 }
		}
	},
	scene: [
		Preload,
		Home,
		Start,
	]
}

const game = new Phaser.Game(config);

document.getElementById("favicon").setAttribute("href", favicon);
