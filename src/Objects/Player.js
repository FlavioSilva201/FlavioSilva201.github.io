export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "Sprite");

		this.keys = this.scene.input.keyboard.addKeys({
			left: "left",
			right: "right",
			up: "up",
			down: "down",
		});
	}

	update() {
		const keys = this.keys;
		const velocity = 200;

		if (keys.left.isDown) {
			this.setVelocity(-velocity, 0);
		} else if (keys.right.isDown) {
			this.setVelocity(velocity, 0);
		};

		if (keys.up.isDown) {
			this.setVelocity(0, -velocity);
		} else if (keys.down.isDown) {
			this.setVelocity(0, velocity);
		}
	}
}
