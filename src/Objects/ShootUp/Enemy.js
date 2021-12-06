import GlobalConfigs from "../../Configs";
import Shoot from "./Shoot";
import { randomNumber } from "../../Utils/Maths";

export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "Duke");

		this.shootDelay = randomNumber(100, 3000);

		this.setDepth(1);
		this.setVelocityY(randomNumber(100, 300));

		this.shoots = this.scene.physics.add.group({
			classType: Shoot,
			runChildUpdate: true,
		});

		this.scene.time.addEvent({
			delay: this.shootDelay,
			callback: this.fire,
			callbackScope: this,
			loop: true,
		});
	}

	fire() {
		console.log("fire");
	}

	kill() {

	}
}
