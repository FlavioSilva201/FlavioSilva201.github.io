export default class Power extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "PascalZim");
		scene.add.existing(this);

		this.liveTime = 0;
	}

	generate() {
		this.setBounceX(1);
		this.setVelocityX(150);
	}

	update(time) {
		if (!this.liveTime) this.liveTime = time;

		if (time > this.liveTime + 10000) this.destroy();
	}
}
