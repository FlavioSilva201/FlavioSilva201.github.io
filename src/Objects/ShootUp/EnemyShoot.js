export class EnemyShoot extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "Duke");
		scene.physics.add.existing(this);

		this.speed = 400;

		this.setDepth(1);
		this.setAngle(-90);
		this.setScale(0.25);
	}

	preUpdate() {
		if (-this.width > this.x) this.kill();
	}

	kill() {
		this.destroy();
	}
}

export default class EnemyShootGroup extends Phaser.Physics.Arcade.Group {
	constructor(world, scene) {
		const config = {
			classType: EnemyShoot,
			runChildUpdate: true,
		};
		super(world, scene, config);
	}

	getNewShoot(x = 0, y = 0) {
		const s = this.get(x, y);
		if (s) {
			s.setVelocityX(-400);
			return s;
		}
	}
}
