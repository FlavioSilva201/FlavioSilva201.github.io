import GlobalConfigs from "../../Configs";

export default class Duke extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		const positionY = y || GlobalConfigs.screen.middleHeight;
		super(scene, x, positionY, "Duke");
	}

	generate() {
		this.setScale(0.6);
		this.setVelocityX(-100);
		this.setBounce(1.0001, 0.35);
	}

	update() {
		if (this.x < 0 || this.y < 0 || this.y > GlobalConfigs.screen.height) this.destroy();
	}
}
