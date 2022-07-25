import { arrayChoice } from "201flaviosilva-utils";

import GlobalConfigs from "../../Configs";
import { generatePlayerParticles } from "./Particles";

import ShootGroup from "./Shoot";

const SPRITES = ["HTML5", "CSS3", "JS", "React", "SASS"];

export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "PlayerShip");

		this.time = 0;
		this.timeNextFire = 0;
		this.marginShoots = 100;

		this.setDepth(10);

		this.shootGroup = new ShootGroup(scene.physics.world, scene);

		// Move particles
		const { hittedEmitter, moveEmitter1, moveEmitter2A, moveEmitter2B, } = generatePlayerParticles(scene, this, x, y);
		this.hittedEmitter = hittedEmitter;
		this.moveEmitter1 = moveEmitter1;
		this.moveEmitter2A = moveEmitter2A;
		this.moveEmitter2B = moveEmitter2B;


		this.hittedTween = scene.tweens.add({
			targets: [this],
			repeat: 4,
			yoyo: true,
			paused: true,
			ease: "Power4",
			duration: 100,
			scale: { from: 1, to: 0.75, },
			alpha: { from: 1, to: 0.5, },
			onUpdate: () => this.refreshBody(),
			onComplete: () => {
				this.setTint(0xffffff);
				this.moveEmitter1.setTint(0xffffff);
				this.moveEmitter2A.start();
				this.moveEmitter2B.start();
			},
		});

		// Keys
		this.keys = scene.input.keyboard.addKeys(GlobalConfigs.controllers.shootUp);
		scene.input.on("pointermove", ({ x, y }) => this.setPosition(x, y));
		scene.input.on("pointerdown", this.fire, this);
	}

	hitted() {
		this.setTint(0xff0000);
		this.moveEmitter1.setTint(0xff0000);
		this.particlesExplode();
		this.moveEmitter2A.stop();
		this.moveEmitter2B.stop();
		this.hittedTween.isPlaying() ? this.hittedTween.restart() : this.hittedTween.play();
	}

	particlesExplode() {
		for (let i = 0; i < 5; i++) {
			this.hittedEmitter.explode();
		}
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
