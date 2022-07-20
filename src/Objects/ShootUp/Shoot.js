import { generatePlayerShootParticles } from "./Particles";

export class Shoot extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, sprite) {
		super(scene, x, y, sprite);
		scene.physics.add.existing(this);

		this.speed = 400;

		this.setPosition(x, y);
		this.setDepth(1);

		this.initialAnimation = scene.tweens.add({
			targets: this,
			ease: "Power4",
			duration: 500,
			scale: { from: 1, to: 0.5, },
			onUpdate: () => this.refreshBody(),
		});

		// Particles
		const { moveParticles, moveParticlesEmitter, explosionParticles, explosionParticlesEmitter } = generatePlayerShootParticles(scene, this, sprite, x, y);
		this.moveParticles = moveParticles;
		this.moveParticlesEmitter = moveParticlesEmitter;

		this.explosionParticles = explosionParticles;
		this.explosionParticlesEmitter = explosionParticlesEmitter;
		this.explosionParticlesEmitter.explode();

		// (Kill) Timer
		this.killTimer = scene.time.addEvent({
			delay: 500,
			callback: () => {
				this.explosionParticlesEmitter.stop();
				this.explosionParticles.destroy();
				this.killTimer.remove();
				this.destroy();
			},
			callbackScope: this,
			loop: false,
			repeat: 0,
			paused: true,
		});
	}

	particlesExplode() {
		this.explosionParticlesEmitter.explode();
	}

	preUpdate() {
		if (this.scene.scale.width < this.x) this.kill();
	}

	kill() {
		this.setVisible(false);
		this.disableBody();

		this.moveParticlesEmitter.stop();
		this.moveParticles.destroy();
		this.initialAnimation.stop();

		this.particlesExplode();
		this.killTimer.paused = false;
	}
}

export default class ShootGroup extends Phaser.Physics.Arcade.Group {
	constructor(world, scene) {
		const config = {
			classType: Shoot,
			runChildUpdate: true,
		};
		super(world, scene, config);
	}

	getNewShoot(x = 0, y = 0, sprite = "HTML5") {
		const s = this.get(x, y, sprite);
		if (s) {
			s.setVelocityX(400);
			return s;
		}
	}
}
