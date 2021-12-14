import GlobalConfigs from "../Configs";

import AnimateTitle from "../Components/AnimatedTitle";
import Tutorial from "../Components/Tutorial";

import Player from "../Objects/Home/Player";

export default class Start extends Phaser.Scene {
	constructor() {
		const config = {
			key: "Start",
			active: false,
			physics: {
				default: "arcade",
				arcade: {
					gravity: { x: 0, y: 0, },
					debug: GlobalConfigs.debug,
				},
			},
		};
		super(config);
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

		{ // Visual Basic
			const vb = this.physics.add.image(middleWidth - 350, middleHeight, "VisualBasic").setScale(4, 2);
			this.physics.add.collider(this.player, vb, () => { this.scene.start("VisualBasic"); });
		}

		{ // Tutorial
			const tutorial = new Tutorial(this, middleWidth - 75, height - 120, "Start");
			tutorial.setScale(0.5);
		}
	}
}
