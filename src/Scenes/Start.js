import GlobalConfigs from "../Config/Configs"
import Player from "../Objects/Player";
import Grass from "../Objects/Grass";

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
		this.grassGroup = this.physics.add.staticGroup({ classType: Grass });
		this.grassGroup.get(middleWidth, height);
	}

	createPlayer() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;
		this.playersGroup = this.physics.add.group({
			classType: Player,
			collideWorldBounds: true,
			runChildUpdate: true
		});
		this.player = this.playersGroup.get(middleWidth, middleHeight);
	}

	createCollision() {
		this.physics.add.collider(this.grassGroup, this.player);
	}

	update() {
		if (this.player.x < this.player.width * 0.75) {
			this.scene.start("Options");
			this.scene.stop();
		}
	}
}
