import GlobalConfigs from "../../Config/Configs";

export default class Shoot extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, sprite) {
		super(scene, x, y, sprite);
		this.speed = -400;
	}

	generate(x, y) {
		this.setPosition(x, y);
		this.setVelocityY(this.speed);
		this.setAngle(90);
		this.setDepth(1);
	}

	update() {
		if (this.y < 0) this.destroy();
	}
}
