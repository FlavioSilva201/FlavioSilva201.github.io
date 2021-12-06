import GlobalConfigs from "../Configs";

import AnimateTitle from "../Components/AnimatedTitle";

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

		// Title
		const title = new AnimateTitle(this, middleWidth, 100, "201flaviosilva");

		const playersGroup = this.physics.add.group({
			classType: Player,
			runChildUpdate: true,
			collideWorldBounds: true,
		});

		this.player = playersGroup.get(middleWidth, middleHeight);
	}
}
