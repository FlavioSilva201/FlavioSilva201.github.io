import { arrayChoice } from "201flaviosilva-utils";

import GlobalConfigs from "../../Configs";

import ShootGroup from "./Shoot";
import { generatePlayerParticles } from "./Particles";

export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "Duke");

		this.timeNextFire = 0;
		this.marginShoots = 100;
		this.speed = 300;

		this.setDepth(10);
		this.setScale(0.75);

		this.isAlive = true;

		this.shootGroup = new ShootGroup(scene.physics.world, scene);

		// Particles
		const { SQUARES_PARTICLES, explosionEmitter, moveEmitter, } = generatePlayerParticles(scene, this);
		this.particles = SQUARES_PARTICLES;
		this.explosionEmitter = explosionEmitter;
		this.moveEmitter = moveEmitter;

		// Keys
		this.keys = scene.input.keyboard.addKeys(GlobalConfigs.controllers.gaming);
	}

	update(time) {
		if (!this.keys || !this.isAlive) return;
		const { left1, left2, right1, right2, shoot1, shoot2, shoot3 } = this.keys;

		// Move X
		if (left1.isDown || left2.isDown) this.setVelocityX(-this.speed);
		else if (right1.isDown || right2.isDown) this.setVelocityX(this.speed);
		else this.setVelocityX(0);

		const isShootPressed = shoot1.isDown || shoot2.isDown || shoot3.isDown;
		if (isShootPressed && time > this.timeNextFire) this.fire(time);
	}

	fire(time) {
		const sprite = arrayChoice(GlobalConfigs.gamingSprites);
		const shoot = this.shootGroup.getNewShoot(this.x, this.y, sprite);
		if (shoot) this.timeNextFire = time + this.marginShoots;
	}

	hitted() {
		this.isAlive = false;
		this.setTint(0xff0000);
		this.explosionEmitter.setPosition(this.x, this.y);
		this.explosionEmitter.explode();
		this.moveEmitter.stop();
	}
}
