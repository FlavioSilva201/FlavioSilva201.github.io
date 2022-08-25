import GlobalConfigs from "../Configs";

import AnimateTitle from "../Components/AnimatedTitle";
import Tutorial from "../Components/Tutorial";

import Player from "../Objects/Home/Player";

export default class Start extends Phaser.Scene {
	constructor() {
		super({ key: "Start", });
	}

	create() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;
		this.input.keyboard.removeAllListeners();

		// Title
		const title = new AnimateTitle(this, middleWidth, 100, "201flaviosilva");

		const playersGroup = this.physics.add.group({
			classType: Player,
			runChildUpdate: true,
			collideWorldBounds: true,
		});
		this.player = playersGroup.get(middleWidth, middleHeight);

		{ // Settings
			const settings = this.physics.add.image(10, 10, "Settings", 1).setOrigin(0);
			this.physics.add.collider(this.player, settings, () => { this.scene.start("Options"); });
		}

		{ // Pascal/Lazarus
			const pascal = this.physics.add.image(middleWidth - 350, middleHeight - 100, "PascalZim").setScale(2);
			this.physics.add.collider(this.player, pascal, () => { this.scene.start("Pascal"); });
		}

		{ // Web
			const web = this.physics.add.image(middleWidth - 350, middleHeight + 100, "Web").setScale(4);
			this.physics.add.collider(this.player, web, () => { this.scene.start("Web"); });
		}

		{ // All
			const snakeAll = this.physics.add.image(middleWidth + 350, middleHeight, "Snake").setScale(4, 2);
			this.physics.add.collider(this.player, snakeAll, () => { this.scene.start("SnakeAll"); });
		}

		{ // Tutorial
			const tutorial = new Tutorial(this, middleWidth - 75, height - 120, "Start");
			tutorial.setScale(0.5);
		}
	}
}
