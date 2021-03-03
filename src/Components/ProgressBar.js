import { TextStyle } from "../Theme";

export default class ProgressBar extends Phaser.GameObjects.Graphics {
	constructor(scene, options) {
		super(scene, options);
		scene.add.existing(this);

		this.drawProgress();
	}

	drawProgress() {
		this.percentText = this.scene.add.text(500, 300, "0%", TextStyle.progressBar);
		this.percentText.setOrigin(0.5);
	}

	updateBar(percentage) {
		this.percentText.setText("Load: " + Math.round(percentage * 100) + "% - " + this?.lastFileLoad?.key);
	}

	fileLoad(file) {
		this.lastFileLoad = file;
	}

	complete() {
		this.percentText.destroy();
	}
}
