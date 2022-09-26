import { range, randomInt } from "201flaviosilva-utils";

import GlobalConfigs from "../../Configs";
import LangManager from "../../Lang/LangManager";

import DebugFPS from "../../Components/DebugFPS";
import StarsBackground from "../../Components/StarsBackground";
import Button from "../../Components/Button";

import Player from "../../Objects/ShootUp/Player";
import EnemyGroup from "../../Objects/ShootUp/Enemy";
import EnemyShootGroup from "../../Objects/ShootUp/EnemyShoot";
import { TextStyle } from "../../Theme";

const EVENTS_NAMES = {
	updateScore: "updateScore",
	scoreCollision: "scoreCollision",
}
const EventSystem = new Phaser.Events.EventEmitter();

export default class Web extends Phaser.Scene {
	constructor() {
		const config = { key: "Web", };
		super(config);
	}

	create() {
		// Background
		const background = new StarsBackground(this);

		// UI
		this.scene.launch("WebUI");

		// -- Game Objects --
		// Player
		this.createPlayer();

		// Enemies
		this.enemiesGroup = new EnemyGroup(this.physics.world, this);
		this.enemiesShootsGroup = new EnemyShootGroup(this.physics.world, this);

		this.enemiesTimer = this.time.addEvent({
			delay: 500,
			callback: this.createEnemies,
			callbackScope: this,
			loop: true,
		});

		// Collisions
		this.physics.add.overlap(this.player, this.enemiesGroup, (player, enemy) => { // Player vs Enemy
			player.hitted();
			enemy.kill();
			EventSystem.emit(EVENTS_NAMES.scoreCollision, -1, { x: enemy.x, y: enemy.y });
		});
		this.physics.add.overlap(this.player, this.enemiesShootsGroup, (player, enemyShoot) => { // Player vs EnemyShoot
			player.hitted();
			enemyShoot.kill();
			EventSystem.emit(EVENTS_NAMES.scoreCollision, -1, { x: enemyShoot.x, y: enemyShoot.y });
		});
		this.physics.add.overlap(this.player.shootGroup, this.enemiesGroup, (playerShoot, enemy) => { // PlayerShoot vs Enemy
			playerShoot.kill();
			enemy.kill();
			EventSystem.emit(EVENTS_NAMES.scoreCollision, 10, { x: playerShoot.x, y: playerShoot.y });
		});
		this.physics.add.overlap(this.player.shootGroup, this.enemiesShootsGroup, (playerShoot, enemyShoot) => { // PlayerShoot vs EnemyShoot
			playerShoot.particlesExplode();
			enemyShoot.kill();
			EventSystem.emit(EVENTS_NAMES.scoreCollision, 100, { x: playerShoot.x, y: playerShoot.y });
		});
	}

	createPlayer() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;

		// Create Player
		this.playersGroup = this.physics.add.group({
			classType: Player,
			runChildUpdate: true,
			collideWorldBounds: true,
		});

		this.player = this.playersGroup.get(middleWidth, middleHeight);
	}

	createEnemies() {
		const x = this.scale.width + 50;
		const y = Phaser.Math.Between(50, this.scale.height - 50);

		const enemy = this.enemiesGroup.getNewEnemy(x, y);
	}
}

export class WebUI extends Phaser.Scene {
	constructor() {
		super({ key: "WebUI" });
	}

	init() {
		this.score = 0;
	}

	create() {
		GlobalConfigs.debug && new DebugFPS(this);

		this.scoreLabel = this.add.text(this.scale.width / 2, 50, this.score, TextStyle.web.scoreLabel)
			.setOrigin(0.5);

		this.exitButton = new Button(this, {
			x: this.scale.width - 50,
			y: 50,
			up: 1,
			down: 0,
			over: 1,
			text: LangManager.getText("exit"),
			upCallback: () => {
				this.scene.stop("Web");
				this.scene.start("Start");
				this.scene.stop("WebUI");
			}
		}).setScale(0.25);

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

		// Update Score
		EventSystem.on(EVENTS_NAMES.scoreCollision, (score, { x, y }) => {
			const updateScoreLabel = new UpdateScoreLabel(this, x, y, score);
			updateScoreLabel.animate(this.scoreLabel);
		});
		EventSystem.on(EVENTS_NAMES.updateScore, (score, color) => {
			this.scoreParticles.explode();
			this.score += score;
			this.scoreLabel.setText(this.score);
			this.scoreLabel.setColor(color);
		});
	}
}

class UpdateScoreLabel extends Phaser.GameObjects.Text {
	constructor(scene, x = 10, y = 10, score = 0, style = TextStyle.web.updateScoreLabel) {
		super(scene, x, y, score, style);
		scene.add.existing(this);

		this.score = score;

		this.setDepth(1000);
		this.setOrigin(0.5);
		this.setColor(score > 0 ? "#0f0" : "#f00");
	}

	animate({ x, y }) {
		this.scene.tweens.add({
			targets: [this],
			duration: 1000,
			ease: "Linear",
			x, y,
			scale: 2,
			onComplete: () => this.kill(),
		});
	}

	kill() {
		EventSystem.emit(EVENTS_NAMES.updateScore, this.score, this.style.color);
		this.destroy();
	}
}
