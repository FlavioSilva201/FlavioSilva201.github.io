import GlobalConfigs from "../../Configs";

// import ShootGroup from "./Shoot";

export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "Duke");

		this.time = 0;
		this.timeNextFire = 0;
		this.marginShoots = 100;
		this.speed = 300;

		this.setDepth(10);
		this.setScale(0.75);

		// this.shootGroup = new ShootGroup(scene.physics.world, scene);

		// Keys
		this.keys = scene.input.keyboard.addKeys(GlobalConfigs.controllers.gaming);
	}

	update(time) {
		this.time = time;
		if (!this.keys) return;
		const { left1, left2, right1, right2, shoot1, shoot2, shoot3 } = this.keys;

		// Move X
		if (left1.isDown || left2.isDown) this.setVelocityX(-this.speed);
		else if (right1.isDown || right2.isDown) this.setVelocityX(this.speed);
		else this.setVelocityX(0);

		const isShootPressed = shoot1.isDown || shoot2.isDown || shoot3.isDown;
		if (isShootPressed && time > this.timeNextFire) this.fire();
	}

	fire() {
		console.log("Fire");
	}
}
