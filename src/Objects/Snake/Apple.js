import GlobalConfigs from "../../Configs";

const TILE_SIZE = GlobalConfigs.snakeTileSize;

export default class Apple extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, sprite) {
		super(scene, x * TILE_SIZE, y * TILE_SIZE, sprite);
		scene.add.existing(this);

		this.isAlive = true;
		this.isWall = false;
		this.spriteName = sprite;

		this.animation = scene.tweens.add({
			targets: [this],
			duration: 10000,
			alpha: { from: 1, to: 0.7 },
			onComplete: () => {
				this.setTint(0xff0000);
				this.isWall = true;
			}
		});
	}

	kill() {
		this.animation.stop();
		this.animation.remove();
		this.isAlive = false;
		this.destroy();
	}
}
