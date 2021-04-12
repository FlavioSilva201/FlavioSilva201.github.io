import GlobalConfigs from '../Config/Configs';

export default class CalcadaPortuguesa extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, frame = 1) {
		super(scene, x, y, "CalcadaPortuguesa", frame);
	}
}
