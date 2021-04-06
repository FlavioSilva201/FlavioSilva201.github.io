import GlobalConfigs from "../Config/Configs";

import AnimateTitle from "../Components/AnimatedTitle";

import Player from "../Objects/Player";
import Tiles from "../Objects/Tiles";
import DirectionSign from "../Objects/DirectionSign";

export default class Start extends Phaser.Scene {
	constructor() {
		super({ key: "Start" });
	}

	init(data) {
		this.lastScene = data.sceneName;
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

		{	// -- Objects
			const x = 50;
			const y = height - 90;

			const signDirectionStart = new DirectionSign(this, width - x, y, "Game");
			signDirectionStart.changeDepth(1);
			const signDirectionOptions = new DirectionSign(this, x, y, "Options").setFlipX(true);
			signDirectionOptions.changeDepth(1);
			signDirectionOptions.label.x += 10;

			const tree1 = this.add.image(middleWidth, height - 86, "Tree1");
			const tree2 = this.add.image(middleWidth / 2, height - 200, "Tree2").setDepth(1);
			const tree3 = this.add.image(width * 0.75, height - 200, "Tree2").setDepth(1);
		}

		{ // UI
			const title = new AnimateTitle(this, middleWidth, 100, "201flaviosilva");
		}
	}

	createPlayer() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;
		this.playersGroup = this.physics.add.group({
			classType: Player,
			collideWorldBounds: true,
			runChildUpdate: true
		});

		const x = this.lastScene === "Options" ? 50 : middleWidth;
		this.player = this.playersGroup.get(x, middleHeight);
		this.player.generate();
	}

	createCollision() {
		this.physics.add.collider(this.tilesGroup, this.player);
	}

	update() {
		if (this.player.x < this.player.width * 0.75) {
			this.scene.start("Options", { sceneName: "Start" });
			this.scene.stop();
		} else if (this.player.x > GlobalConfigs.screen.width - this.player.width * 0.75) {
			this.scene.start("Loading", { nextGame: "Birth" });
			this.scene.stop();
		}
	}
}
