import GlobalConfigs from '../../Configs';

export default class SkyTiles extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, frame = 1) {
		super(scene, x, y, "SkyTiles", frame);
	}

	changeScale(scale) {
		this.setSize(this.width * scale, this.height * scale);
		this.setScale(scale);
	}
}
