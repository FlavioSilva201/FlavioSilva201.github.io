import { TextStyle } from "../Theme";

export default class DirectionSign extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, text) {
		super(scene, x, y, "SignDirection");
		scene.add.existing(this);

		this.setScale(1.25);

		this.label = this.scene.add.text(this.x - 5, this.y - 10, text, TextStyle.objects.signals).setOrigin(0.5);
	}

	changeDepth(depth) {
		this.setDepth(depth);
		this.label.setDepth(depth + 1);
	}
}
