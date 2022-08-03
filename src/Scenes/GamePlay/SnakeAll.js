import GlobalConfigs from "../../Configs";
import DebugFPS from "../../Components/DebugFPS";
import Button from "../../Components/Button";
import EventSystem, { EVENTS_NAMES } from "../../Objects/Snake/EventSystem";

import { TextStyle } from "../../Theme";


import Player from "../../Objects/Snake/Player";
import Apple from "../../Objects/Snake/Apple";

const APPLES_NAMES = ["HTML5", "CSS3", "React", "JS", "SASS", "Lazarus"]

export default class SnakeAll extends Phaser.Scene {
	constructor() {
		const config = {
			key: "SnakeAll",
			cameras: {
				// backgroundColor: 0x00ff00,
				x: 0,
				y: 8,
				width: 1280, // 40*32
				height: 704, // 22*32
			},
			physics: {
				default: "arcade",
				arcade: {
					gravity: { x: 0, y: 0, },
					debug: GlobalConfigs.debug,
				},
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

		EventSystem.once(EVENTS_NAMES.playerDied, (value) => {
			this.isAlive = false;
			this.newAppleTimer.paused = true;
		});

		EventSystem.once(EVENTS_NAMES.restartGame, (value) => { this.scene.restart(); });
		this.events.on("shutdown", () => EventSystem.removeAllListeners());
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

	update(time, delta) {
		if (!this.isAlive) return;

		this.player.update(time);

		this.apples.forEach(apple => {
			if (this.player.head.x === apple.x && this.player.head.y === apple.y && apple.isAlive) {
				this.player.grow(apple.spriteName);
				apple.kill();
				EventSystem.emit(EVENTS_NAMES.increaseScore, 1);
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
			text: "Exit",
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
			text: "Restart",
			textStyle: TextStyle.base,
			upCallback: () => { EventSystem.emit(EVENTS_NAMES.restartGame); },
		}).changeVisibility(false);

		EventSystem.once(EVENTS_NAMES.playerDied, (value) => this.restartButton.changeVisibility(true));
		EventSystem.on(EVENTS_NAMES.increaseScore, this.updateScore.bind(this));
		this.events.on("shutdown", () => EventSystem.removeAllListeners());
	}

	updateScore(value, position) {
		this.score += value;
		this.scoreLabel.setText(this.score);
	}
}
