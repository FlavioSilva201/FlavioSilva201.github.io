import GlobalConfigs from '../../Configs';

export default class Cactus extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		const positionY = y || GlobalConfigs.screen.height - 110;
		super(scene, x, positionY, "Cactus");
	}
}
