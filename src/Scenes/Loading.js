import GlobalConfigs from "../Config/Configs";

import { TextStyle } from "../Theme";

import AnimateTitle from "../Components/AnimatedTitle";

export default class Loading extends Phaser.Scene {
	constructor() {
		super({ key: "Loading" });
	}

	init(data) {
		const nextGame = data.nextGame || "Loading";
		const gender = nextGame === "Birth" ? "platform" : "shotUp";

		this.nextGame = {
			name: nextGame,
			gender: gender,
		};
	}

	create() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;

		// -- Title
		const title = new AnimateTitle(this, middleWidth, middleHeight, this.nextGame.name);

		// -- Player
		this.add.text(100, 500, "Player");
		this.add.image(100, 600, "PlayerIdle", 1);

		// -- Controls
		const platformCont = GlobalConfigs.controllers.platform;

		const keys = Object.keys(platformCont);
		for (let i = 0; i < keys.length; i++) {
			this.add.text(middleWidth, middleHeight + i * 40, keys[i] + " => " + platformCont[keys[i]].toLowerCase() + " key");
		}

		// Keys Events
		const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		spaceKey.removeAllListeners();
		spaceKey.on("down", () => {
			this.scene.start(this.nextGame.name);
		}, this);
	}
}
