import GlobalConfigs from "../Configs";

import { TextStyle } from "../Theme";

export default class Index extends Phaser.Scene {
	constructor() {
		super({ key: "Index" });
	}

	create() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;

		const margin = 75;

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
			y: middleHeight,
			text: "Old Site",
			action: () => this.openOldSite(),
		};
		this.createText(configOldSite);

		// Old Site
		const configPDF = {
			x: middleWidth,
			y: middleHeight + margin,
			text: "PDF",
			action: () => this.openPDF(),
		};
		this.createText(configPDF);
	}

	openOldSite() {
		const url = "./V1/index.html";
		const s = window.open(url, "_blank");

		if (s && s.focus) s.focus();
		else if (!s) window.location.href = url;
	}

	openPDF() {
		const url = "./PDF/indexEN.html";
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
