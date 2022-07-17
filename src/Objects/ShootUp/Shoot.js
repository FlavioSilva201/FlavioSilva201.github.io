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

		this.moveParticles = scene.add.particles(sprite);
		this.moveParticlesEmitter = this.moveParticles.createEmitter({
			x, y,
			follow: this,
			quantity: 1,
			speedX: { min: -500, max: -250 },
			speedY: { min: -250, max: 250 },
			scale: { start: 0.33, end: 0 },
			alpha: { start: 0.5, end: 0 },
			rotate: { start: 0, end: 360 },
			lifespan: { min: 100, max: 500 },
		});

		// Kill
		this.explosionParticles = scene.add.particles(sprite);
		this.explosionParticlesEmitter = this.explosionParticles.createEmitter({
			x, y,
			follow: this,
			quantity: 100,
			frequency: -1,
			scale: { start: 0.75, end: 0 },
			alpha: { start: 0.75, end: 0 },
			speed: { min: 50, max: 150 },
			rotate: { start: 0, end: 360 },
			lifespan: { min: 250, max: 750 },
		});
		this.explosionParticlesEmitter.explode();

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

	preUpdate() {
		if (this.scene.scale.width < this.x) this.kill();
	}

	kill() {
		this.moveParticlesEmitter.stop();
		this.moveParticles.destroy();
		this.initialAnimation.stop();

		this.disableBody();
		this.setVisible(false);

		this.explosionParticlesEmitter.explode();
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
