import { randomInt } from "201flaviosilva-utils";

import EventSystem, { EVENTS_NAMES } from "./EventSystem";
import { TextStyle } from "../../Theme";

export default class UpdateScoreLabel extends Phaser.GameObjects.Text {
	constructor(scene, x = 10, y = 10, score = 0, spriteKey = "JS", style = TextStyle.snake.updateScoreLabel) {
		super(scene, x, y, score, style);
		scene.add.existing(this);

		this.score = score;

		this.setDepth(1000);
		this.setOrigin(0.5);
		this.setColor("#ff0");

		this.particles = scene.add.particles(spriteKey);
		this.particlesEmitter = this.particles.createEmitter({
			x, y,
			quantity: 64,
			frequency: -1,
			scale: { start: 1, end: 0 },
			alpha: { start: 1, end: 0 },
			angle: { start: 0, end: 360, steps: 64 },
			rotate: { start: randomInt(-360, 360), end: randomInt(-360, 360) },
			speed: { min: 500, max: 750 },
			lifespan: { min: 750, max: 1000 },
		});
		this.particlesEmitter.explode();
	}

	animate({ x, y }) {
		this.scene.tweens.add({
			targets: [this],
			x, y,
			ease: "Linear",
			duration: 1000,
			scale: 2,
			onComplete: () => this.kill(),
		});
	}

	kill() {
		EventSystem.emit(EVENTS_NAMES.updateScore, this.score);
		this.particlesEmitter.stop();
		this.particles.destroy();
		this.destroy();
	}
}
