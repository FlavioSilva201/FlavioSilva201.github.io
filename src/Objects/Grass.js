import GlobalConfigs from '../Config/Configs';

export default class Grass extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "Grass");
	}
}