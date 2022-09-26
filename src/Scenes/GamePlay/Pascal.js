import GlobalConfigs from "../../Configs";
import LangManager from "../../Lang/LangManager";

import AnimateTitle from "../../Components/AnimatedTitle";
import Button from "../../Components/Button";
import DebugFPS from "../../Components/DebugFPS";

import Duke from "../../Objects/Platform/Duke";
import Player from "../../Objects/Platform/Player";

import Cactus from "../../Objects/Platform/Cactus";
import CratePower from "../../Objects/Platform/CratePower";
import Power from "../../Objects/Platform/Power";
import Tiles from "../../Objects/Platform/Tiles";
import SkyTiles from "../../Objects/Platform/SkyTiles";


const SCENE_WIDTH = 7000;

export default class Pascal extends Phaser.Scene {
	constructor() {
		const config = {
			key: "Pascal",
			physics: {
				default: "arcade",
				arcade: {
					debug: GlobalConfigs.debug,
					gravity: { x: 0, y: 200, },
				},
			},
		};
		super(config);
	}

	init() {
		this.isIsland2DukesCreated = false;
		this.isIsland3DukesCreated = false;
	}

	create() {
		this.createWorld();
		this.createStartEnemies();
		this.createPlayer();
		this.createCollision();

		GlobalConfigs.debug && this.createDebug();

		this.scene.launch("PascalUI");
	}

	createDebug() {
		const graphics = this.add.graphics().setDepth(0);
		graphics.lineStyle(1, 0xff0000, 1);
		for (let i = 0; i < SCENE_WIDTH / 500; i++) {
			const x = i * 500;
			graphics.lineBetween(x, 0, x, GlobalConfigs.screen.height);
			this.add.text(x, 0, x, { fill: "black" });
		}
	}

	createWorld() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;
		this.powerShootGroup = this.physics.add.group({ classType: Power, runChildUpdate: true });

		{
			// -- Background
			const background = this.add.image(middleWidth, middleHeight, "BackgroundForest").setScale(1.3, 1);
			background.setScrollFactor(0);

			// Title
			new AnimateTitle(this, middleWidth, 100, "Pascal");
		}

		{	// -- Floor
			this.tilesGroup = this.physics.add.staticGroup({ classType: Tiles, });
			{ // 1 Island
				const grassNumber = 3000 / 128;
				for (let i = 0; i < grassNumber; i++) {
					const g = this.tilesGroup.get(128 * i + 64, height, 1);
					g.fixHitBox();
				}

				const gEnd1 = this.tilesGroup.get(3128, height, 6);
				gEnd1.fixHitBox();
			}

			{ // 2 Island
				const start = 3600;
				const numGrass = 4;
				const end = start + (numGrass + 1) * 127;

				const gStart = this.tilesGroup.get(start, height, 10);
				gStart.fixHitBox();

				for (let i = 0; i < numGrass; i++) {
					const g = this.tilesGroup.get(127 * i + start + 127, height, 1);
					g.fixHitBox();
				}

				const gEnd = this.tilesGroup.get(end, height, 6);
				gEnd.fixHitBox();
			}

			{ // 3 Island
				const start = 4800;
				const numGrass = (SCENE_WIDTH - start) / 128 - 1;

				const gStart = this.tilesGroup.get(start, height, 10);
				gStart.fixHitBox();

				for (let i = 0; i < numGrass; i++) {
					const g = this.tilesGroup.get(127 * i + start + 127, height, 1);
					g.fixHitBox();
				}
			}

			this.createSkyTales();
		}

		{ // Environment / Objects
			this.cactusGroup = this.physics.add.staticGroup({ classType: Cactus });

			this.add.image(200, height - 95, "Bush2");
			this.add.image(250, height - 200, "Tree2").setDepth(11);
			this.add.image(330, height - 80, "Bush1").setDepth(11);

			this.add.image(700, height - 80, "Stone").setScale(0.75);
			this.add.image(740, height - 70, "Mushroom1").setScale(0.5).setRotation(Phaser.Math.DegToRad(30));


			this.add.image(1380 + 100, height - 80, "Tree1");

			this.add.image(1330, middleHeight + 60, "Bush3").setScale(0.75);
			this.add.image(1440, middleHeight + 60, "Bush2").setScale(0.5);

			this.add.image(2000, height - 80, "Bush2");
			this.add.image(2550, height - 80, "Bush4").setDepth(2);
		}

		this.createCactus();

		// End Scene, Castle
		this.castle = this.physics.add.image(SCENE_WIDTH - 100, middleHeight, "Castle");
		this.castle.setScale(0.75);
	}

	createSkyTales() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;

		this.skyTilesGroup = this.physics.add.staticGroup({ classType: SkyTiles, });
		this.cratePowerGroup = this.physics.add.staticGroup({ classType: CratePower, runChildUpdate: true });

		{ // 1 Island
			const y = middleHeight + 100;

			const skyGrass1 = this.skyTilesGroup.get(1330, y, 0);
			skyGrass1.changeScale(0.5);

			const crate = this.cratePowerGroup.get(skyGrass1.x + 58, y, "Pascal");
			crate.generate();

			this.skyTilesGroup.get(crate.x + 58, y, 2).changeScale(0.5);
		}

		{ // 2 Island
			const crate = this.cratePowerGroup.get(3950, middleHeight + 100, "Lazarus");
			crate.generate();
		}
	}

	createCactus() {
		{ // Island 1
			this.cactusGroup.get(1800);
			this.cactusGroup.get(2300);
			this.cactusGroup.get(2800);
		}

		{ // Island 2
			this.cactusGroup.get(3600);
			this.cactusGroup.get(4240);
		}
	}

	createStartEnemies() {
		this.dukes = this.physics.add.group({ classType: Duke, runChildUpdate: true, });

		{ // Duke 1
			const duke = this.dukes.get(1280);
			if (duke) duke.generate();
		}

		{ // Duke 2
			const duke = this.dukes.get(2300);
			if (duke) duke.generate();
		}

		{ // Dukes 3
			const duke1 = this.dukes.get(2800);
			if (duke1) duke1.generate();

			const duke2 = this.dukes.get(2900);
			if (duke2) duke2.generate();
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
		const bounds = new Phaser.Geom.Rectangle(0, 0, SCENE_WIDTH, height);
		this.player.body.setBoundsRectangle(bounds);

		// Set camera follow player
		this.cameras.main.setBounds(0, 0, SCENE_WIDTH, height, this.player);
		this.cameras.main.startFollow(this.player, false, 0.1, 0.1);
	}

	createCollision() {
		let endGame = false;
		// Solids / Statistics
		// Player
		this.physics.add.collider(this.tilesGroup, this.player);
		this.physics.add.collider(this.skyTilesGroup, this.player);
		this.physics.add.collider(this.cratePowerGroup, this.player);
		this.physics.add.collider(this.cactusGroup, this.player);

		// Player Shoot
		this.physics.add.collider(this.tilesGroup, this.player.shoots);
		this.physics.add.collider(this.skyTilesGroup, this.player.shoots);
		this.physics.add.collider(this.cratePowerGroup, this.player.shoots);
		this.physics.add.collider(this.cactusGroup, this.player.shoots);

		// Duke
		this.physics.add.collider(this.dukes);
		this.physics.add.collider(this.tilesGroup, this.dukes);
		this.physics.add.collider(this.skyTilesGroup, this.dukes);
		this.physics.add.collider(this.cratePowerGroup, this.dukes);
		this.physics.add.collider(this.cactusGroup, this.dukes);

		// PowerGroup
		this.physics.add.collider(this.tilesGroup, this.powerShootGroup);
		this.physics.add.collider(this.skyTilesGroup, this.powerShootGroup);
		this.physics.add.collider(this.cratePowerGroup, this.powerShootGroup);
		this.physics.add.collider(this.cactusGroup, this.powerShootGroup);

		// Cactus
		this.physics.add.collider(this.tilesGroup, this.cactusGroup);
		this.physics.add.collider(this.skyTilesGroup, this.cactusGroup);

		// Castle
		this.physics.add.collider(this.tilesGroup, this.castle);


		// With reactions
		this.physics.add.overlap(this.powerShootGroup, this.player, (player, power) => {
			this.player.playerStatus.shootType = power.powerType;
			power.destroy();
		}, null, this);

		this.physics.add.overlap(this.player, this.dukes, () => this.scene.start("Start"), null, this);

		this.physics.add.overlap(this.powerShootGroup, this.dukes, (p, d) => {
			p.destroy();
			d.destroy();
		}, null, this);

		this.physics.add.overlap(this.player.shoots, this.dukes, (s, d) => {
			s.destroy();
			d.destroy();
		}, null, this);

		this.physics.add.overlap(this.castle, this.player, (c, p) => {
			if (endGame) return;
			endGame = true;
			this.player.keys = null;
			this.player.body.destroy();
			this.tweens.add({
				targets: [this.player],
				ease: "Linear",
				duration: 500,
				delay: 100,
				x: { from: this.player.x, to: this.castle.x },
				y: { from: this.player.y, to: 640, },
				scale: { from: this.player.scale, to: 0.75 },
				alpha: { from: 1, to: 0.75 },
				completeDelay: 250,
				onComplete: () => this.scene.start("Start"),
			});
		}, null, this);
	}

	update() {
		if (this.player.x > 3000 && !this.isIsland2DukesCreated) this.createDukesIsland2(); // Dukes Island 2
		if (this.player.x > 4500 && !this.isIsland3DukesCreated) this.createDukesIsland3(); // Dukes Island 3
	}

	createDukesIsland2() {
		this.isIsland2DukesCreated = true;

		const duke1 = this.dukes.get(4000);
		if (duke1) duke1.generate();

		const duke2 = this.dukes.get(4100);
		if (duke2) duke2.generate();
	}

	createDukesIsland3() {
		this.isIsland3DukesCreated = true;

		// Group 1
		const duke1_1 = this.dukes.get(5300);
		if (duke1_1) duke1_1.generate();

		// Group 2
		const duke2_1 = this.dukes.get(5800);
		if (duke2_1) duke2_1.generate();

		const duke2_2 = this.dukes.get(6000);
		if (duke2_2) duke2_2.generate();

		// Group 3
		const margin = 100;
		const duke3_1 = this.dukes.get(SCENE_WIDTH - margin * 6);
		if (duke3_1) duke3_1.generate();

		const duke3_2 = this.dukes.get(SCENE_WIDTH - margin * 5);
		if (duke3_2) duke3_2.generate();

		const duke3_3 = this.dukes.get(SCENE_WIDTH - margin * 4);
		if (duke3_3) duke3_3.generate();

		const duke3_4 = this.dukes.get(SCENE_WIDTH - margin * 3);
		if (duke3_4) duke3_4.generate();

		const duke3_5 = this.dukes.get(SCENE_WIDTH - margin * 2);
		if (duke3_5) duke3_5.generate();

		const duke3_6 = this.dukes.get(SCENE_WIDTH - margin * 1);
		if (duke3_6) duke3_6.generate();

		const duke3_7 = this.dukes.get(SCENE_WIDTH);
		if (duke3_7) duke3_7.generate();
	}
}

export class PascalUI extends Phaser.Scene {
	constructor() {
		super({ key: "PascalUI" });
	}

	create() {
		GlobalConfigs.debug && new DebugFPS(this);

		this.exitButton = new Button(this, {
			x: this.scale.width - 50,
			y: 50,
			up: 1,
			down: 0,
			over: 1,
			text: LangManager.getText("exit"),
			upCallback: () => {
				this.scene.stop("Pascal");
				this.scene.start("Start");
				this.scene.stop("PascalUI");
			}
		}).setScale(0.25);
	}
}
