import { DOM } from "201flaviosilva-utils";

import StarsBackground from "../Components/StarsBackground";
import GlobalConfigs from "../Configs";
import { TextStyle } from "../Theme";

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
		const { middleWidth, middleHeight } = GlobalConfigs.screen;

		const margin = 36;

		// Background
		const background = new StarsBackground(this);

		// Start
		this.createText({
			x: middleWidth,
			y: middleHeight - margin,
			text: "Start",
			action: () => this.scene.start("Start"),
		});

		// PDF
		this.createText({
			x: middleWidth,
			y: middleHeight + margin,
			text: "PDF",
			action: () => this.openPDF(),
		});
	}

	openPDF() {
		const url = "https://github.com/201flaviosilva/201flaviosilva.github.io/blob/PDF/FlavioSilva.pdf";
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
