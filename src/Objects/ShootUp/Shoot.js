import GlobalConfigs from "../../Config/Configs";

export default class Shoot extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, sprite) {
		super(scene, x, y, sprite);
	}

	generate(x, y) {
		this.setPosition(x, y);
		this.body.setAllowGravity(false);
		this.setVelocityY(-GlobalConfigs.screen.height);
	}

	update() {
		if (this.y < 0) this.destroy();
	}
}
