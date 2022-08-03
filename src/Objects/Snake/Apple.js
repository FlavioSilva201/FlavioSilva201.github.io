import GlobalConfigs from "../../Configs";

const TILE_SIZE = GlobalConfigs.snakeTileSize;

export default class Apple extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, sprite) {
		super(scene, x * TILE_SIZE, y * TILE_SIZE, sprite);
		scene.add.existing(this);

		this.isAlive = true;
		this.spriteName = sprite;
	}

	kill() {
		this.isAlive = false;
		this.destroy();
	}
}
