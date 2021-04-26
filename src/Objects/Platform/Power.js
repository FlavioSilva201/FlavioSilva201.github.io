export default class Power extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, powerType) {
		super(scene, x, y, powerType);
		scene.add.existing(this);

		this.powerType = powerType;

		this.degreeNum = 0;

		this.liveTime = 0;
	}

	generate() {
		this.setBounceX(1);
		this.setVelocityX(150);
	}

	update(time) {
		if (!this.liveTime) this.liveTime = time;

		if (this.powerType == "Lazarus") {
			this.degreeNum++;
			this.setAngle(this.degreeNum);
		}

		if (time > this.liveTime + 10000) this.destroy();
	}
}
