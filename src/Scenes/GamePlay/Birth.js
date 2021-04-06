import GlobalConfigs from "../../Config/Configs";

import AnimateTitle from "../../Components/AnimatedTitle";

import Player from "../../Objects/Player";
import Tiles from "../../Objects/Tiles";

export default class Birth extends Phaser.Scene {
	constructor() {
		super({ key: "Birth" });
	}

	create() {
		this.createWorld();
		this.createPlayer();
		this.createCollision();
	}

	createWorld() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;

		// -- Background
		const background = this.add.image(middleWidth, middleHeight, "BackgroundForest").setScale(1.3, 1);

		{	// -- Floor
			this.tilesGroup = this.physics.add.staticGroup({ classType: Tiles, });
			const grassNumber = width / 128;
			for (let i = 0; i < grassNumber; i++) {
				const g = this.tilesGroup.get(128 * i + 64, height, 1);
			}
		}

		{ // UI
			const title = new AnimateTitle(this, middleWidth, 100, "Birth");
		}
	}

	createPlayer() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;

		// Create Player
		this.playersGroup = this.physics.add.group({
			classType: Player,
			collideWorldBounds: true,
			runChildUpdate: true
		});

		this.player = this.playersGroup.get(50, middleHeight);
		this.player.generate();

		// Set camera follow player
		this.cameras.main.setBounds(0, 0, 2000, height, this.player);
		this.cameras.main.startFollow(this.player, false, 0.1, 0.1);
	}

	createCollision() {
		this.physics.add.collider(this.tilesGroup, this.player);
	}

	update() { }
}
