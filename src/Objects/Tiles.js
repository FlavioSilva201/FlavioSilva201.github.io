import GlobalConfigs from '../Config/Configs';

export default class Tiles extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, frame = 1) {
		super(scene, x, y, "Tiles", frame);
	}
}
