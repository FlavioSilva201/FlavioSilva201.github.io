import GlobalConfigs from "../Config/Configs";

import Player from "../Objects/Player";
import Grass from "../Objects/Grass";

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

		this.grassGroup = this.physics.add.staticGroup({ classType: Grass });
		const scaleWidth = width / 32;
		this.grassGroup.get(middleWidth, height * 0.66).setScale(scaleWidth, 1).refreshBody();
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

		this.physics.add.collider(this.grassGroup, this.player);
	}

	update() {
		if (this.player.x > GlobalConfigs.screen.width - this.player.width * 0.75) {
			this.scene.start("Options", { sceneName: "Credits" });
			this.scene.stop();
		}
	}
}
