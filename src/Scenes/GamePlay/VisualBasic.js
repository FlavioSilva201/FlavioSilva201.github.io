import GlobalConfigs from "../../Configs";
import { randomNumber } from "../../Utils/Maths";

import Player from "../../Objects/ShootUp/Player";

export default class VisualBasic extends Phaser.Scene {
	constructor() {
		const config = {
			key: "VisualBasic",
			physics: {
				default: "arcade",
				arcade: {
					gravity: { x: 0, y: 0, },
					debug: GlobalConfigs.debug,
				},
			},
		};
		super(config);
		console.log("VisualBasic");
	}

	init() { }

	create() {
		this.createWorld();
		this.createPlayer();
		this.createCollision();
	}

	createWorld() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;
	}

	createPlayer() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;

		// Create Player
		this.playersGroup = this.physics.add.group({
			classType: Player,
			runChildUpdate: true,
			collideWorldBounds: true,
		});

		this.player = this.playersGroup.get(middleWidth, middleHeight);
		this.player.generate();
	}

	createCollision() { }

	update() { }
}
