export default class Power extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "PascalZim");
		scene.add.existing(this);
	}

	generate() {
		this.setBounceX(1);
		this.setVelocityX(150);
	}
}
