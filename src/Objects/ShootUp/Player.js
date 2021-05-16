import GlobalConfigs from "../../Config/Configs";

import Shoot from "./Shoot";

export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "PlayerShip");

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
		this.body.setAllowGravity(false);
	}

	update(time) {
		if (!this.keys) return;
		const keys = this.keys;

		if (keys.shoot.isDown) {
			const shoot = this.shoots.get(this.x, this.y, "Lazarus");
			if (shoot) shoot.generate(this.x, this.y);
		}
	}
}
