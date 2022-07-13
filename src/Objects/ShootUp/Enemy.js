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
	}

	fire() {
		const shoot = this.shoots.getNewShoot(this.x, this.y);
		if (shoot) shoot.setVelocityX(-400);
	}

	kill() {
		this.shootTimer.remove();
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
