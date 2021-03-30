import GlobalConfigs from "../Config/Configs";

import { TextStyle } from "../Theme";

import Player from "../Objects/Player";
import Tiles from "../Objects/Tiles";

export default class Start extends Phaser.Scene {
	constructor() {
		super({ key: "Start" });
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

			const xText = 52;
			const yText = height - 100;

			const signDirectionStart = this.add.image(width - x, y, "SignDirection").setScale(1.25);
			const textStart = this.add.text(width - xText, yText, "Start", TextStyle.start.signals).setOrigin(0.5);

			const signDirectionOptions = this.add.image(x, y, "SignDirection").setFlipX(true).setScale(1.25);
			const textOptions = this.add.text(xText, yText, "Options", TextStyle.start.signals).setOrigin(0.5);
		}

		{ // UI
			const title = this.add.text(middleWidth, 100, " 201flaviosilva ", TextStyle.start.title).setOrigin(0.5);
			this.tweens.add({
				targets: title,
				ease: "Bounce",
				duration: 1500,
				y: { from: middleHeight, to: 100 },
				scale: { from: 4, to: 0.9 },
				alpha: { from: 0.5, to: 1 },
			});
		}
	}

	createPlayer() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;
		this.playersGroup = this.physics.add.group({
			classType: Player,
			collideWorldBounds: true,
			runChildUpdate: true
		});
		this.player = this.playersGroup.get(middleWidth, middleHeight);
		this.player.generate();
	}

	createCollision() {
		this.physics.add.collider(this.tilesGroup, this.player);
	}

	update() {
		if (this.player.x < this.player.width * 0.75) {
			this.scene.start("Options", { sceneName: "Start" });
			this.scene.stop();
		}
	}
}
