import GlobalConfigs from '../Configs';
import { TextStyle } from "../Theme";

export default class ProgressBar extends Phaser.GameObjects.Graphics {
	constructor(scene, options) {
		super(scene, options);
		scene.add.existing(this);

		this.drawProgress();
	}

	drawProgress() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;
		this.percentText = this.scene.add.text(middleWidth, middleHeight, "0%", TextStyle.components.progressBar).setOrigin(0.5);
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
