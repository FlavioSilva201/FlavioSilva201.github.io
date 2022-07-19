import { arrayChoice } from "201flaviosilva-utils";

import GlobalConfigs from "../../Configs";
import { generatePlayerParticles } from "./Particles";

import ShootGroup from "./Shoot";

const SPRITES = ["HTML5", "CSS3", "JS"];

export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "PlayerShip");

		this.time = 0;
		this.timeNextFire = 0;
		this.marginShoots = 100;

		this.setDepth(10);

		this.shootGroup = new ShootGroup(scene.physics.world, scene);

		// Move particles
		const { explosionEmitter, moveEmitter1, moveEmitter2A, moveEmitter2B, } = generatePlayerParticles(scene, this, x, y);
		this.moveEmitter1 = moveEmitter1;
		this.moveEmitter2A = moveEmitter2A;
		this.moveEmitter2B = moveEmitter2B;

		// Keys
		this.keys = scene.input.keyboard.addKeys(GlobalConfigs.controllers.shootUp);
		scene.input.on("pointermove", ({ x, y }) => this.setPosition(x, y));
		scene.input.on("pointerdown", this.fire, this);
	}

	update(time) {
		this.time = time;
		if (!this.keys) return;
		const keys = this.keys;

		if (keys.shoot.isDown && time > this.timeNextFire) this.fire();

		this.moveEmitter2A.setPosition(this.x, this.y);
		this.moveEmitter2B.setPosition(this.x, this.y);
	}

	fire() {
		const sprite = arrayChoice(SPRITES);
		const shoot = this.shootGroup.getNewShoot(this.x, this.y, sprite);
		if (shoot) this.timeNextFire = this.time + this.marginShoots;
	}
}
