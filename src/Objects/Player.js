import GlobalConfigs from '../Config/Configs';
export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "Player");

		this.keys = this.scene.input.keyboard.addKeys(GlobalConfigs.controllers);
	}

	update() {
		const keys = this.keys;
		const velocity = 200;

		// Move X
		if (keys.left.isDown) this.setVelocity(-velocity, 0);
		else if (keys.right.isDown) this.setVelocity(velocity, 0);

		// Move Y
		if (keys.up.isDown) this.setVelocity(0, -velocity);
		else if (keys.down.isDown) this.setVelocity(0, velocity);

		// console.log(this.body.touching.down);
	}
}