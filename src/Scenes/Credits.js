import GlobalConfigs from "../Config/Configs";

import AnimateTitle from "../Components/AnimatedTitle";
import OptionsButton from "../Components/OptionsButton";

import Player from "../Objects/Player";
import Tiles from "../Objects/Tiles";
import DirectionSign from "../Objects/DirectionSign";

export default class Credits extends Phaser.Scene {
	constructor() {
		super({ key: "Credits" });
	}

	create() {
		this.createWorld();
		this.createText();
		this.createPlayer();
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

			const alpha = 0.85;
			const tree1 = this.add.image(width * 0.25, height - 86, "Tree1").setAlpha(alpha);
			const tree2 = this.add.image(middleWidth, height - 200, "Tree2").setDepth(1).setAlpha(alpha);
			const tree3 = this.add.image(width * 0.75, height - 200, "Tree3").setAlpha(alpha);
		}
	}

	createText() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;
		{ // Title
			const title = new AnimateTitle(this, middleWidth, 100, "Credits");
		}
	}

	createPlayer() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;
		this.playersGroup = this.physics.add.group({
			classType: Player,
			collideWorldBounds: true,
			runChildUpdate: true
		});
		this.player = this.playersGroup.get(width - 50, middleHeight);
		this.player.generate();

		this.physics.add.collider(this.tilesGroup, this.player);
	}

	update() {
		if (this.player.x > GlobalConfigs.screen.width - this.player.width * 0.75) {
			this.scene.start("Options", { sceneName: "Credits" });
			this.scene.stop();
		}
	}
}
