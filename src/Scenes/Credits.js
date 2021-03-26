import GlobalConfigs from "../Config/Configs";

import Player from "../Objects/Player";
import Tiles from "../Objects/Tiles";

export default class Credits extends Phaser.Scene {
	constructor() {
		super({ key: "Credits" });
	}

	create() {
		this.createWorld();
		this.createPlayer();
	}

	createWorld() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;

		this.tilesGroup = this.physics.add.staticGroup({ classType: Tiles });
		const scaleWidth = width / 32;
		this.tilesGroup.get(middleWidth, height * 0.66).setScale(scaleWidth, 1).refreshBody();
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
