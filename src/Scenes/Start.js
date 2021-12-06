import GlobalConfigs from "../Configs";

import { TextStyle } from "../Theme";

export default class Start extends Phaser.Scene {
	constructor() {
		super({ key: "Start" });
	}

	create() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;

		const margin = 40;

		// Start
		const configStart = {
			x: middleWidth,
			y: middleHeight - margin,
			text: "Start",
			action: () => this.scene.start("Start"),
		};
		this.createText(configStart);

		// Old Site
		const configOldSite = {
			x: middleWidth,
			y: middleHeight + margin,
			text: "Old Site",
			action: () => this.openOldSite(),
		};
		this.createText(configOldSite);
	}

	openOldSite() {
		const url = "https://201flaviosilva.bitbucket.io/src/201flaviosilva/V1/index.html";
		const s = window.open(url, "_blank");

		if (s && s.focus) s.focus();
		else if (!s) window.location.href = url;
	}

	createText(configs) {
		const { x, y, text, action } = configs;
		const label = this.add.text(x, y, text, TextStyle.home.menu.normal).setOrigin(0.5);
		label.setInteractive({ useHandCursor: true });
		label.on("pointerover", () => label.setStyle(TextStyle.home.menu.over));
		label.on("pointerout", () => label.setStyle(TextStyle.home.menu.normal));
		label.on("pointerup", action);
	}
}
