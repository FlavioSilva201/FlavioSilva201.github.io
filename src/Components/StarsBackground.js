import GlobalConfigs from "../Configs";

export default class StarsBackground extends Phaser.GameObjects.TileSprite {
	constructor(scene, xSpeed = -15000, ySpeed = 100, rotationSpeed = 0.00001) {
		const { middleWidth, middleHeight, width, height } = GlobalConfigs.screen;
		super(scene, middleWidth, middleHeight, width * 2, height * 2, "StarsBackground");
		scene.add.existing(this);

		this.bgPosition = 0.1;
		this.xSpeed = xSpeed;
		this.ySpeed = ySpeed;
		this.rotationSpeed = rotationSpeed;

		this.setAlpha(0.75);
		this.setDepth(-1);
	}

	preUpdate() {
		this.tilePositionX = Math.cos(this.bgPosition) * this.xSpeed;
		this.tilePositionY = Math.sin(this.bgPosition) * this.ySpeed;
		this.rotation += this.rotationSpeed;

		this.bgPosition += 0.0005;
	}
}
