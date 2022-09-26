import GlobalConfigs from '../../Configs';

export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "DukeLeft");

		this.keys = this.scene.input.keyboard.addKeys(GlobalConfigs.controllers.start);

		this.accelerationSpeed = 300;
		this.rotationSpeed = 100;
	}

	update() {
		if (!this.keys) return;
		const keys = this.keys;

		// Change Rotation
		if (keys.right1.isDown || keys.right2.isDown) {
			this.setAngularVelocity(this.rotationSpeed);
		} else if (keys.left1.isDown || keys.left2.isDown) {
			this.setAngularVelocity(-this.rotationSpeed);
		} else this.setAngularVelocity(0);

		// Move
		if (keys.acceleration1.isDown || keys.acceleration2.isDown) {
			this.scene.physics.velocityFromRotation(this.rotation, this.accelerationSpeed, this.body.velocity);
		} else if (keys.back1.isDown || keys.back2.isDown) {
			this.scene.physics.velocityFromRotation(this.rotation, -this.accelerationSpeed, this.body.velocity);
		} else this.setVelocity(0);
	}
}
