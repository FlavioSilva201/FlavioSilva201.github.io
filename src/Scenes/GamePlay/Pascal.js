import GlobalConfigs from "../../Config/Configs";
import { degreesToRadians } from "../../Utils/Maths";

import AnimateTitle from "../../Components/AnimatedTitle";

import Player from "../../Objects/Platform/Player";
import Duke from "../../Objects/Platform/Duke";

import Tiles from "../../Objects/Platform/Tiles";
import SkyTiles from "../../Objects/Platform/SkyTiles";
import CratePower from "../../Objects/Platform/CratePower";
import Power from "../../Objects/Platform/Power";


const SCENE_WIDTH = 2000;

export default class Pascal extends Phaser.Scene {
	constructor() {
		super({ key: "Pascal" });
	}

	create() {
		this.createWorld();
		this.createEnemies();
		this.createPlayer();
		this.createCollision();
	}

	createWorld() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;
		this.pascalPowerGroup = this.physics.add.group({ classType: Power, runChildUpdate: true });

		{
			// -- Background
			const background = this.add.image(middleWidth, middleHeight, "BackgroundForest").setScale(1.3, 1);
			background.setScrollFactor(0);

			// UI
			new AnimateTitle(this, middleWidth, 100, "Pascal");
		}

		{	// -- Floor
			this.tilesGroup = this.physics.add.staticGroup({ classType: Tiles, });
			const grassNumber = SCENE_WIDTH / 128;
			for (let i = 0; i < grassNumber; i++) {
				const g = this.tilesGroup.get(128 * i + 64, height, 1);
				g.fixHitBox();
			}

			this.createSkyTales();
		}

		{ // Environment / Objects
			this.add.image(200, height - 95, "Bush2");
			this.add.image(250, height - 200, "Tree2").setDepth(11);
			this.add.image(330, height - 80, "Bush1").setDepth(11);

			this.add.image(700, height - 80, "Stone").setScale(0.75);
			this.add.image(740, height - 70, "Mushroom1").setScale(0.5).setRotation(degreesToRadians(30));


			this.add.image(width + 100, height - 80, "Tree1");

			this.add.image(width + 50, middleHeight + 60, "Bush3").setScale(0.75);
			this.add.image(width + 160, middleHeight + 60, "Bush2").setScale(0.5);
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

	createEnemies() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;
		this.dukes = this.physics.add.group({ classType: Duke, runChildUpdate: true, });

		const duke1 = this.dukes.get(width, middleHeight, "Duke");
		if (duke1) duke1.generate();
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
		const bounds = new Phaser.Geom.Rectangle(0, 0, SCENE_WIDTH, height);
		this.player.body.setBoundsRectangle(bounds);

		// Set camera follow player
		this.cameras.main.setBounds(0, 0, SCENE_WIDTH, height, this.player);
		this.cameras.main.startFollow(this.player, false, 0.1, 0.1);

		// --- Debug
		// this.player.setX(width + 100);
		// this.player.setY(height - 100);
	}

	createCollision() {
		// Solids / Statistics
		this.physics.add.collider(this.tilesGroup, this.player);
		this.physics.add.collider(this.skyTilesGroup, this.player);
		this.physics.add.collider(this.cratePowerGroup, this.player);

		this.physics.add.collider(this.tilesGroup, this.player.shoots);
		this.physics.add.collider(this.skyTilesGroup, this.player.shoots);
		this.physics.add.collider(this.cratePowerGroup, this.player.shoots);

		this.physics.add.collider(this.tilesGroup, this.dukes);
		this.physics.add.collider(this.skyTilesGroup, this.dukes);
		this.physics.add.collider(this.cratePowerGroup, this.dukes);

		this.physics.add.collider(this.tilesGroup, this.pascalPowerGroup);
		this.physics.add.collider(this.skyTilesGroup, this.pascalPowerGroup);
		this.physics.add.collider(this.cratePowerGroup, this.pascalPowerGroup);


		//
		this.physics.add.overlap(this.pascalPowerGroup, this.player, (player, pascal) => {
			this.player.playerStatus.shootType = "PascalZim";
			pascal.destroy();
		}, null, this);

		this.physics.add.overlap(this.player, this.dukes, () => this.scene.start("Start"), null, this);

		this.physics.add.overlap(this.pascalPowerGroup, this.dukes, (p, d) => {
			p.destroy();
			d.destroy();
		}, null, this);

		this.physics.add.overlap(this.player.shoots, this.dukes, (s, d) => {
			s.destroy();
			d.destroy();
		}, null, this);
	}

	update() { }
}
