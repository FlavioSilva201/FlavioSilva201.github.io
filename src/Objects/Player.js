import GlobalConfigs from '../Config/Configs';
export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "Player");

		this.keys = this.scene.input.keyboard.addKeys(GlobalConfigs.controllers);

		scene.add.existing(this);
	}

	generate() { }

	update() {
		const keys = this.keys;
		const velocity = 200;

		// Move X
		if (keys.left.isDown) this.setVelocityX(-velocity);
		else if (keys.right.isDown) this.setVelocityX(velocity);
		else this.setVelocityX(0);

		// Move Y
		if (keys.up.isDown && this.body.onFloor()) this.setVelocityY(-velocity);
		else if (keys.down.isDown) this.setVelocityY(velocity);
	}
}