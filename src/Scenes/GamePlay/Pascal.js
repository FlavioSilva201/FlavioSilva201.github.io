import GlobalConfigs from "../../Config/Configs";

import AnimateTitle from "../../Components/AnimatedTitle";

import Player from "../../Objects/Player";
import Tiles from "../../Objects/Tiles";
import SkyTiles from "../../Objects/SkyTiles";
import CratePower from "../../Objects/CratePower";

import PascalPower from "../../Objects/Power/PascalPower";

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
		this.pascalPowerGroup = this.physics.add.group({ classType: PascalPower, });

		// -- Background
		const background = this.add.image(middleWidth, middleHeight, "BackgroundForest").setScale(1.3, 1);
		background.setScrollFactor(0);

		{	// -- Floor
			this.tilesGroup = this.physics.add.staticGroup({ classType: Tiles, });
			const grassNumber = width * 2 / 128;
			for (let i = 0; i < grassNumber; i++) {
				this.tilesGroup.get(128 * i + 64, height, 1);
			}

			this.createSkyTales();
		}

		{ // UI
			new AnimateTitle(this, middleWidth, 100, "Pascal");
		}
	}

	createSkyTales() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;

		{ // First Group
			this.skyTilesGroup = this.physics.add.staticGroup({ classType: SkyTiles, });
			this.cratePowerGroup = this.physics.add.staticGroup({ classType: CratePower, runChildUpdate: true });

			const y = middleHeight + 100;

			const skyGrass1 = this.skyTilesGroup.get(width + 50, y, 0);
			skyGrass1.changeScale(0.5);

			const crate = this.cratePowerGroup.get(skyGrass1.x + 58, y);
			crate.generate();
			// crate.setScale(0.7);

			this.skyTilesGroup.get(crate.x + 58, y, 2).changeScale(0.5);
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

		// ---
		// this.player.setX(width + 50);
		// this.player.setY(height - 100);
	}

	createCollision() {
		this.physics.add.collider(this.tilesGroup, this.player);
		this.physics.add.collider(this.skyTilesGroup, this.player);
		this.physics.add.collider(this.cratePowerGroup, this.player);
		this.physics.add.collider(this.pascalPowerGroup, this.player, (player, pascal) => {
			this.player.playerStatus.shootType = "Pascal";
			pascal.destroy();
		});

		this.physics.add.collider(this.tilesGroup, this.pascalPowerGroup);
		this.physics.add.collider(this.skyTilesGroup, this.pascalPowerGroup);
	}

	update() { }
}
