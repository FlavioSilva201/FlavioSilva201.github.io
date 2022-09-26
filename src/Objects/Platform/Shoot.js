export default class Shoot extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, sprite) {
		super(scene, x, y, sprite);

		this.sprite = sprite;
		this.degreeNum = 0;
		this.liveTime = 0;
	}

	generate(direction) {
		this.setBounce(0.5);
		if (direction) this.setVelocityX(-300);
		else this.setVelocityX(300);
	}

	update(time) {
		if (!this.liveTime) this.liveTime = time;

		if (this.sprite == "Lazarus") {
			this.degreeNum += 2;
			this.setAngle(this.degreeNum);
		}

		if (time > this.liveTime + 3000) this.destroy();
	}
}
