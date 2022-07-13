import GlobalConfigs from "../../Configs";

export class Shoot extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, sprite) {
		super(scene, x, y, sprite);
		scene.physics.add.existing(this);

		this.speed = 400;

		this.setPosition(x, y);
		this.setDepth(1);
	}

	preUpdate() {
		if (this.scene.scale.width < this.x) this.destroy();
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

	getNewShoot(x = 0, y = 0) {
		const s = this.get(x, y, "VisualBasic");
		if (s) {
			s.setVelocityX(400);
			return s;
		}
	}
}
