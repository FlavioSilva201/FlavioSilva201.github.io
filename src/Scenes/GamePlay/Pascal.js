import GlobalConfigs from "../../Config/Configs";

import AnimateTitle from "../../Components/AnimatedTitle";

import Player from "../../Objects/Player";
import Tiles from "../../Objects/Tiles";
import SkyTiles from "../../Objects/SkyTiles";

export default class Pascal extends Phaser.Scene {
	constructor() {
		super({ key: "Pascal" });
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
		background.setScrollFactor(0);

		{	// -- Floor
			this.tilesGroup = this.physics.add.staticGroup({ classType: Tiles, });
			const grassNumber = width * 2 / 128;
			for (let i = 0; i < grassNumber; i++) {
				const g = this.tilesGroup.get(128 * i + 64, height, 1);
			}
		}

		{ // Sky Tales
			this.skyTilesGroup = this.physics.add.staticGroup({ classType: SkyTiles, });
			const y = middleHeight + 100;
			const skyGrass1 = this.skyTilesGroup.get(width, y, 0).changeScale(0.5);
			const crate = this.add.sprite(width + 60, y, "Crate").setScale(0.7);
			const skyGrass2 = this.skyTilesGroup.get(width + 120, y, 2).changeScale(0.5);
		}

		{ // UI
			const title = new AnimateTitle(this, middleWidth, 100, "Pascal");
		}
	}

	createPlayer() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;

		// Create Player
		this.playersGroup = this.physics.add.group({
			classType: Player,
			runChildUpdate: true,
			collideWorldBounds: true,
		});

		this.player = this.playersGroup.get(50, middleHeight);
		this.player.generate();
		const bounds = new Phaser.Geom.Rectangle(0, 0, width * 2, height);
		this.player.body.setBoundsRectangle(bounds);

		// Set camera follow player
		this.cameras.main.setBounds(0, 0, width * 2, height, this.player);
		this.cameras.main.startFollow(this.player, false, 0.1, 0.1);

		// this.player.setX(width);
	}

	createCollision() {
		this.physics.add.collider(this.tilesGroup, this.player);
		this.physics.add.collider(this.skyTilesGroup, this.player);
	}

	update() { }
}
