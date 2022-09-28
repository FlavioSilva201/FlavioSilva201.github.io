import { range, randomInt } from "201flaviosilva-utils";

import GlobalConfigs from "../../Configs";
import LangManager from "../../Lang/LangManager";

import DebugFPS from "../../Components/DebugFPS";
import Button from "../../Components/Button";
import UpdateScoreLabel from "../../Objects/Common/UpdateScoreLabel";

import { TextStyle } from "../../Theme";

import Player from "../../Objects/Gaming/Player";
import EnemyGroup from "../../Objects/Gaming/Enemy";
import EventSystem, { EVENTS_NAMES } from "../../Objects/Common/EventSystem";

export default class Gaming extends Phaser.Scene {
	constructor() {
		super({ key: "Gaming", });
	}

	init() {
		EventSystem.removeListener(EVENTS_NAMES.restartGame);
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

		// Triggers
		const triggers = [this.add.zone(0, middleHeight), this.add.zone(width, middleHeight)];
		for (let i = 0; i < triggers.length; i++) {
			const t = triggers[i];
			t.setSize(10, height);
			this.physics.world.enable(t);
			t.body.setAllowGravity(false);
			t.body.moves = false;
		}

		this.enemiesGroup = new EnemyGroup(this.physics.world, this);

		// Collisions
		// Enemies vs Zones
		this.physics.add.overlap(this.enemiesGroup, triggers, (t, e) => {
			this.enemiesGroup.setVelocityX(e.body.velocity.x * -1);
			this.enemiesGroup.getChildren().forEach(e => {
				const marginOnCollision = Number(e.body.velocity.x > 0) ? 1 : -1;
				e.setPosition(e.x + marginOnCollision, e.y + 10);
			});
		}, null, this);

		// Enemies vs Player Shoot
		this.physics.add.overlap(this.enemiesGroup, this.player.shootGroup, (enemy, shoot) => {
			if (enemy.type === shoot.type) {
				EventSystem.emit(EVENTS_NAMES.increaseScore, 1, { ...enemy }, enemy.type);
				enemy.kill();
				shoot.kill();
				this.player.marginShoots += 10;

				if (this.enemiesGroup.countActive() === 0) this.enemiesGroup.generateAllEnemies();
			}
		}, null, this);

		// Player vs Enemies
		this.physics.add.overlap(this.enemiesGroup, this.player, () => {
			EventSystem.emit(EVENTS_NAMES.gameOver);
			this.player.hitted();
			this.physics.pause();
			this.tweens.pauseAll();
		});

		EventSystem.on(EVENTS_NAMES.restartGame, () => { this.scene.restart(); });
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
			text: LangManager.getText("exit"),
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
		EventSystem.removeListener(EVENTS_NAMES.gameOver);
		EventSystem.on(EVENTS_NAMES.gameOver, value => this.restartButton.changeVisibility(true));

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
