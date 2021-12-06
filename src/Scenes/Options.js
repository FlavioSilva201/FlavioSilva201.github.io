import GlobalConfigs from "../Configs";

import AnimateTitle from "../Components/AnimatedTitle";
import OptionsButton from "../Components/OptionsButton";

import Player from "../Objects/Platform/Player";
import Tiles from "../Objects/Platform/Tiles";
import DirectionSign from "../Objects/DirectionSign";

export default class Options extends Phaser.Scene {
	constructor() {
		super({ key: "Options" });
	}

	create() {
		this.createWorld();
		this.createUI();
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

			const signDirectionStart = new DirectionSign(this, width - x, y, "Start");
			signDirectionStart.changeDepth(1);

			const tree1 = this.add.image(middleWidth, height - 86, "Tree1");
			const tree2 = this.add.image(width * 0.25, height - 86, "Tree1");
			const tree3 = this.add.image(width * 0.75, height - 86, "Tree1");
		}
	}

	createUI() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;
		this.optionsGroup = this.physics.add.staticGroup({
			classType: OptionsButton,
			runChildUpdate: true,
		});

		const yLevel1 = height - 175;
		const yLevel2 = height - 225;

		{ // Language Button
			const x = width * 0.25;
			this.languageButton = this.optionsGroup.get(x, yLevel1);
			this.languageButton.generate({
				x: x,
				y: yLevel1,
				image: "Flags",
			});
		}

		{ // FullScreen Button
			const x = middleWidth;
			this.fullScreenButton = this.optionsGroup.get(x, yLevel2);
			this.fullScreenButton.generate({
				x: x,
				y: yLevel2,
				image: "FullScreen",
			});
		}

		{ // Sound Button
			const x = width * 0.75;
			this.soundButton = this.optionsGroup.get(x, yLevel1);
			this.soundButton.generate({
				x: x,
				y: yLevel1,
				image: "Sound",
			});
		}

		// { // Difficulty
		// 	const x = middleWidth;
		// 	this.soundButton = this.optionsGroup.get(x, yLevel1);
		// 	this.soundButton.generate({
		// 		x: x,
		// 		y: yLevel1,
		// 		image: "Difficulty",
		// 	});
		// }

		{ // Title
			const title = new AnimateTitle(this, middleWidth, 100, "Options");
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
		this.physics.add.collider(this.optionsGroup, this.player);
	}

	update() {
		if (this.player.x > GlobalConfigs.screen.width - this.player.width * 0.75) {
			this.scene.start("Start", { sceneName: "Options" });
			this.scene.stop();
		}
	}
}
