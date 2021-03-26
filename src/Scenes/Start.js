import GlobalConfigs from "../Config/Configs"
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
		const background = this.add.image(middleWidth, middleHeight, "BackgroundForest").setScale(1.3, 1);

		this.tilesGroup = this.physics.add.staticGroup({ classType: Tiles, });
		const grassNumber = width / 128;
		for (let i = 0; i < grassNumber; i++) {
			const g = this.tilesGroup.get(128 * i + 64, height, 1);
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
