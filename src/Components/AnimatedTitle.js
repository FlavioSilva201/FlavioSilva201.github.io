import GlobalConfigs from "../Configs";

import { TextStyle } from "../Theme";

export default class AnimateTitle extends Phaser.GameObjects.Text {
	constructor(scene, x, y, text) {
		const formattedText = " " + text + " ";
		super(scene, x, y, formattedText, TextStyle.components.animateTitle);

		this.setOrigin(0.5);

		scene.add.existing(this);

		this.animation();
	}

	animation() {
		const { middleHeight } = GlobalConfigs.screen;
		this.scene.tweens.add({
			targets: this,
			ease: "Bounce",
			duration: 1500,
			y: { from: middleHeight, to: 100 },
			scale: { from: 4, to: 0.9 },
			alpha: { from: 0.5, to: 1 },
		});
	}
}
