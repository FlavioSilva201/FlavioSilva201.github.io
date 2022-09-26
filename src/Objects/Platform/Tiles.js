export default class Tiles extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, frame = 1) {
		frame = frame || 1;

		super(scene, x, y, "Tiles", frame);
	}

	fixHitBox() {
		this.setSize(this.width, this.height * 0.9);
	}

	changeScale(scale) {
		this.setSize(this.width * scale, this.height * scale);
		this.setScale(scale);
	}
}
