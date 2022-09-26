import { generateEnemyParticles } from "./Particles";

export class Enemy extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "Duke");

		this.shootDelay = Phaser.Math.Between(1000, 10000);

		this.setDepth(1);
		this.setAngle(-90);
		this.setScale(0.75);

		this.shootTimer = scene.time.addEvent({
			delay: this.shootDelay,
			callback: this.fire,
			callbackScope: this,
			loop: true,
		});

		const { particles, particlesEmitter, deadParticlesEmitter, } = generateEnemyParticles(scene, this);
		this.particles = particles;
		this.particlesEmitter = particlesEmitter;
		this.deadParticlesEmitter = deadParticlesEmitter;
	}

	fire() {
		const shoot = this.scene.enemiesShootsGroup.getNewShoot(this.x, this.y);
		if (shoot) shoot.setVelocityX(-400);
	}

	kill() {
		this.setTint(0xff0000);
		this.setVisible(false);
		this.disableBody();

		this.shootTimer.paused = true;
		this.shootTimer.remove();

		this.particlesEmitter.stop();
		this.deadParticlesEmitter.explode();

		const killTimer = this.scene.time.addEvent({
			delay: 500,
			callback: () => {
				// End Destroy Enemy
				this.deadParticlesEmitter.stop();
				this.particles.destroy();

				killTimer.remove();
				this.destroy();
			},
			callbackScope: this,
			loop: false,
			repeat: 0,
		});
	}

	preUpdate() {
		if (-this.width > this.x) this.kill();
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
