import { range, randomInt } from "201flaviosilva-utils";

import GlobalConfigs from "../../Configs";
import DebugFPS from "../../Components/DebugFPS";
import Button from "../../Components/Button";
import EventSystem, { EVENTS_NAMES } from "../../Objects/Snake/EventSystem";
import UpdateScoreLabel from "../../Objects/Snake/UpdateScoreLabel";

import { TextStyle } from "../../Theme";

import Player from "../../Objects/Gaming/Player";

export default class Gaming extends Phaser.Scene {
	constructor() {
		super({ key: "Gaming", });
	}

	init() {
	}

	create() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;
		// UI
		this.scene.launch("GamingUI");

		// Game
		// Player
		this.playersGroup = this.physics.add.group({
			classType: Player,
			runChildUpdate: true,
			collideWorldBounds: true,
		});

		this.player = this.playersGroup.get(middleWidth, height - 50);
	}

	update(time) {
	}
}

export class GamingUI extends Phaser.Scene {
	constructor() {
		super({ key: "GamingUI" });
	}

	init() {
		this.score = 0;
	}

	create() {
		GlobalConfigs.debug && new DebugFPS(this);

		this.scoreLabel = this.add.text(this.scale.width / 2, 50, this.score, TextStyle.snake.scoreLabel)
			.setOrigin(0.5);

		this.exitButton = new Button(this, {
			x: this.scale.width - 50,
			y: 50,
			up: 1,
			down: 0,
			over: 1,
			text: "Exit",
			upCallback: () => {
				this.scene.stop("Gaming");
				this.scene.start("Start");
				this.scene.stop("GamingUI");
			}
		}).setScale(0.25);

		this.restartButton = new Button(this, {
			x: this.scale.width / 2,
			y: this.scale.height / 2,
			up: 1,
			down: 0,
			over: 1,
			text: "Restart",
			textStyle: TextStyle.base,
			upCallback: () => { EventSystem.emit(EVENTS_NAMES.restartGame); },
		}).changeVisibility(false);

		const SQUARES_PARTICLES = this.add.particles("SquaresParticles");
		this.scoreParticles = SQUARES_PARTICLES.createEmitter({
			frame: range(0, 9),
			x: this.scoreLabel.x,
			y: this.scoreLabel.y,
			quantity: 64,
			frequency: -1,
			scale: { start: 0.75, end: 0 },
			alpha: { start: 0.75, end: 0 },
			angle: { start: 0, end: 360, steps: 64 },
			rotate: { start: randomInt(-360, 360), end: randomInt(-360, 360) },
			speed: { min: 500, max: 750 },
			lifespan: 1000,
		});

		// Events
		EventSystem.on(EVENTS_NAMES.gameOver, (value) => this.restartButton.changeVisibility(true));

		EventSystem.removeListener(EVENTS_NAMES.increaseScore);
		EventSystem.on(EVENTS_NAMES.increaseScore, this.createNewScoreLabel.bind(this));

		EventSystem.removeListener(EVENTS_NAMES.updateScore);
		EventSystem.on(EVENTS_NAMES.updateScore, score => {
			this.scoreParticles.explode();
			this.score += score;
			this.scoreLabel.setText(this.score);
		});
	}

	createNewScoreLabel(score, { x, y }, spriteKey) {
		const updateScoreLabel = new UpdateScoreLabel(this, x, y, score, spriteKey);
		updateScoreLabel.animate(this.scoreLabel);
	}
}
