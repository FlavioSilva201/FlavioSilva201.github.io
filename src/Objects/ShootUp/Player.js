import { arrayChoice } from "201flaviosilva-utils";

import GlobalConfigs from "../../Configs";

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
		this.moveParticles = scene.add.particles("PlayerShip")
			.createEmitter({
				x, y,
				follow: this,
				quantity: 1,
				// moveToY: { min: this.y - 100, max: this.y + 100 },
				speedX: { min: -500, max: -250 },
				speedY: { min: -250, max: 250 },
				scale: { start: 0.5, end: 0 },
				alpha: { start: 0.5, end: 0 },
				rotate: { start: 0, end: 360 },
				lifespan: { min: 100, max: 500 },
			});

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
	}

	fire() {
		const sprite = arrayChoice(SPRITES);
		const shoot = this.shootGroup.getNewShoot(this.x, this.y, sprite);
		if (shoot) this.timeNextFire = this.time + this.marginShoots;
	}
}
