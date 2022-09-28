import { DOM } from "201flaviosilva-utils";

import GlobalConfigs from "../Configs";
import { TextStyle } from "../Theme";
import StarsBackground from "../Components/StarsBackground";

export default class Index extends Phaser.Scene {
	constructor() {
		super({ key: "Index" });
	}

	init() {
		const { android, iOS, iPad, iPhone, windowsPhone } = this.sys.game.device.os;
		if (android || iOS || iPad || iPhone || windowsPhone) {
			DOM.notification({
				text: "This game not available on mobile devices. Please click on Vetus button.",
				animated: true,
				animationTime: 10,
				closeButton: true,
				endPosition: 100,
				style: {
					border: "1px solid #058005",
					boxShadow: "0 0 10px #058005, 0 0 50px #058005",
					background: "#023b02",
				},
				textStyle: {
					color: "#058005",
					boxShadow: "0 0 10px #023b02, 0 0 50px #023b02",
				},
			});
		}
	}

	create() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;

		const margin = 75;

		// Background
		const background = new StarsBackground(this);

		// Start
		this.createText({
			x: middleWidth,
			y: middleHeight - margin,
			text: "Start",
			action: () => this.scene.start("Start"),
		});

		// V1
		this.createText({
			x: middleWidth,
			y: middleHeight,
			text: "Vetus",
			action: () => this.openV1(),
		});

		// PDF
		this.createText({
			x: middleWidth,
			y: middleHeight + margin,
			text: "PDF",
			action: () => this.openPDF(),
		});
	}

	openV1() {
		const url = "/V1/index.html";
		const s = window.open(url, "_blank");

		if (s && s.focus) s.focus();
		else if (!s) window.location.href = url;
	}

	openPDF() {
		const url = "/PDF/indexEN.html";
		const s = window.open(url, "_blank");

		if (s && s.focus) s.focus();
		else if (!s) window.location.href = url;
	}

	createText(configs) {
		const { x, y, text, action } = configs;
		const label = this.add.text(x, y, text, TextStyle.home.menu.normal).setOrigin(0.5).setInteractive({ useHandCursor: true });
		label.on("pointerover", () => label.setStyle(TextStyle.home.menu.over));
		label.on("pointerout", () => label.setStyle(TextStyle.home.menu.normal));
		label.on("pointerup", action);
	}
}
