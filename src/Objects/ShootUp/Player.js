import GlobalConfigs from "../../Configs";
import Shoot from "./Shoot";

export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "PlayerShip");

		this.timeNextFire = 0;
		this.marginShoots = 100;

		this.keys = this.scene.input.keyboard.addKeys(GlobalConfigs.controllers.shootUp);

		this.shoots = this.scene.physics.add.group({
			classType: Shoot,
			runChildUpdate: true,
		});

		this.scene.input.on("pointermove", pointer => {
			const { x, y } = pointer;
			this.setPosition(x, y);
		});
	}

	generate() {
		this.setDepth(10);
	}

	update(time) {
		if (!this.keys) return;
		const keys = this.keys;

		if (keys.shoot.isDown && time > this.timeNextFire) {
			const shoot = this.shoots.get(this.x, this.y, "VisualBasic");
			if (shoot) {
				this.timeNextFire = time + this.marginShoots;
				shoot.generate(this.x, this.y);
			}
		}
	}
}
