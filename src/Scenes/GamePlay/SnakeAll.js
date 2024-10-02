import { range, randomInt } from "201flaviosilva-utils";

import GlobalConfigs from "../../Configs";
import LangManager from "../../Lang/LangManager";

import DebugFPS from "../../Components/DebugFPS";
import Button from "../../Components/Button";
import EventSystem, { EVENTS_NAMES } from "../../Objects/Common/EventSystem";

import { TextStyle } from "../../Theme";

import UpdateScoreLabel from "../../Objects/Common/UpdateScoreLabel";
import Player from "../../Objects/Snake/Player";
import Apple from "../../Objects/Snake/Apple";

const APPLES_NAMES = GlobalConfigs.snakeSprites;

export default class SnakeAll extends Phaser.Scene {
	constructor() {
		const config = {
			key: "SnakeAll",
			cameras: {
				x: 0,
				y: 8,
				width: 1280, // 40*32
				height: 704, // 22*32
			},
		};
		super(config);
	}

	init() {
		const { width, height } = this.cameras.main;
		this.MAX_WIDTH = Math.floor(width / GlobalConfigs.snakeTileSize) - 1;
		this.MAX_HEIGHT = Math.floor(height / GlobalConfigs.snakeTileSize) - 1;

		this.isAlive = true;
	}

	create() {
		// Background

		// UI
		this.scene.launch("SnakeAllUI");

		{ // Show the game background
			const { width, height } = this.cameras.main;
			const margin = 8;
			const graphics = this.add.graphics();
			graphics.fillStyle(0x00ff00);
			graphics.fillRect(margin, margin, width - margin * 2, height - margin * 2);
		}

		// Game
		this.player = new Player(this, 8, 8);
		this.apples = [];

		this.newAppleTimer = this.time.addEvent({
			delay: 500,
			callback: this.newApple,
			callbackScope: this,
			loop: true,
		});

		EventSystem.removeListener(EVENTS_NAMES.gameOver);
		EventSystem.on(EVENTS_NAMES.gameOver, (value) => {
			this.isAlive = false;
			this.player.isAlive = false;
			this.newAppleTimer.paused = true;
			this.tweens.pauseAll();
		});

		EventSystem.removeListener(EVENTS_NAMES.restartGame);
		EventSystem.on(EVENTS_NAMES.restartGame, (value) => { this.scene.restart(); });
	}

	newApple() {
		const { snakeTileSize } = GlobalConfigs;
		const x = Phaser.Math.Between(1, this.MAX_WIDTH);
		const y = Phaser.Math.Between(1, this.MAX_HEIGHT);

		if ( // Check if there is an apple or the snake body at the same position of the new apple
			this.apples.find(apple => apple.x === x * snakeTileSize && apple.y === y * snakeTileSize) ||
			this.player.body.getChildren().find(body => body.x === x * snakeTileSize && body.y === y * snakeTileSize)
		) return;

		const apple = new Apple(this, x, y, APPLES_NAMES[Phaser.Math.Between(0, APPLES_NAMES.length - 1)]);
		this.apples.push(apple);
	}

	update(time) {
		if (!this.isAlive) return;

		this.player.update(time);

		this.apples.forEach(apple => {
			if (this.player.head.x === apple.x && this.player.head.y === apple.y && apple.isAlive) {
				if (apple.isWall) {
					EventSystem.emit(EVENTS_NAMES.gameOver);
					apple.setDepth(100000);
					return;
				}
				this.player.grow(apple.spriteName);
				apple.kill();
				EventSystem.emit(EVENTS_NAMES.increaseScore, 1, apple, apple.spriteName);
			}
		});
	}
}

export class SnakeAllUI extends Phaser.Scene {
	constructor() {
		super({ key: "SnakeAllUI" });
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
			text: LangManager.getText("exit"),
			upCallback: () => {
				this.scene.stop("SnakeAll");
				this.scene.start("Start");
				this.scene.stop("SnakeAllUI");
			}
		}).setScale(0.25);

		this.restartButton = new Button(this, {
			x: this.scale.width / 2,
			y: this.scale.height / 2,
			up: 1,
			down: 0,
			over: 1,
			text: LangManager.getText("restart"),
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
