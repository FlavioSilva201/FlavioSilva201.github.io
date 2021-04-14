import GlobalConfigs from "../../Config/Configs";

export default class Duke extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "Duke");
	}

	generate() {
		this.setScale(0.6);
		this.setVelocityX(-100);
		this.setBounce(1, 0.35);
	}

	update() {
		if (this.x < 0 || this.y > GlobalConfigs.screen.height) this.destroy();
	}
}
