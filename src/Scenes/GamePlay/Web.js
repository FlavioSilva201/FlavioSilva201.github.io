import GlobalConfigs from "../../Configs";

import StarsBackground from "../../Components/StarsBackground";

import Player from "../../Objects/ShootUp/Player";
import EnemyGroup from "../../Objects/ShootUp/Enemy";

export default class Web extends Phaser.Scene {
	constructor() {
		const config = {
			key: "Web",
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

	create() {
		// World
		const background = new StarsBackground(this);

		this.createPlayer();

		// Enemies
		this.enemies = new EnemyGroup(this.physics.world, this);

		this.enemiesTimer = this.time.addEvent({
			delay: 500,
			callback: this.createEnemies,
			callbackScope: this,
			loop: true,
		});

		// Collisions
		this.physics.add.overlap(this.player, this.enemies, (player, enemy) => enemy.kill(), null, this);
		this.physics.add.overlap(this.player.shootGroup, this.enemies, (playerShoot, enemy) => {
			playerShoot.kill();
			enemy.kill();
		}, null, this);
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

		const enemy = this.enemies.getNewEnemy(x, y);
	}
}
