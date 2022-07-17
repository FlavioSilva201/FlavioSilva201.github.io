import { randomInt } from "201flaviosilva-utils";
import EnemyShootGroup from "./EnemyShoot";

export class Enemy extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "Duke");

		this.shootDelay = Phaser.Math.Between(1000, 10000);

		this.setDepth(1);
		this.setAngle(-90);
		this.setScale(0.75);

		this.shoots = new EnemyShootGroup(this.scene.physics.world, this.scene);

		this.shootTimer = scene.time.addEvent({
			delay: this.shootDelay,
			// callback: this.fire,
			callbackScope: this,
			loop: true,
		});

		this.particles = scene.add.particles("Duke");
		this.particlesEmitter = this.particles.createEmitter({
			follow: this,
			quantity: 1,
			frequency: 100,
			speedX: { min: 500, max: 250 },
			speedY: { min: 250, max: -250 },
			scale: { start: 0.5, end: 0 },
			alpha: { start: 0.5, end: 0 },
			rotate: { start: -90, end: randomInt(-360, 360) },
			lifespan: { min: 100, max: 500 },
		});
	}

	fire() {
		const shoot = this.shoots.getNewShoot(this.x, this.y);
		if (shoot) shoot.setVelocityX(-400);
	}

	kill() {
		this.shootTimer.remove();
		this.particlesEmitter.stop();
		this.particles.destroy();
		this.destroy();
	}

	preUpdate() {
		if (0 > this.x) this.kill();
	}
}

export default class EnemyGroup extends Phaser.Physics.Arcade.Group {
	constructor(world, scene) {
		const config = {
			classType: Enemy,
			runChildUpdate: true,
		};
		super(world, scene, config);
	}

	getNewEnemy(x = 0, y = 0) {
		const e = this.get(x, y);
		if (e) {
			e.setVelocityX(-Phaser.Math.Between(50, 250));
			return e;
		}
	}
}
