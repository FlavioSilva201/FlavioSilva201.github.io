export default class CratePower extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, powerType) {
		super(scene, x, y, "Crate");
		this.setScale(0.7);

		this.powerType = powerType;

		this.isAlive = true;
	}

	generate() {
		this.setDepth(9);
	}

	update() {
		if (this.body.touching.down && this.isAlive) {
			this.isAlive = false;
			this.animation();
		}
	}

	animation() {
		this.scene.tweens.add({
			targets: this,
			ease: "Linear",
			duration: 150,
			props: {
				y: { from: this.y, to: this.y - 25 },
				alpha: { value: '0.75', delay: 200, duration: 50, ease: 'Linear' },
			},
			yoyo: true,
			completeDelay: 50,
			onComplete: () => {
				this.setAlpha(0.75);
				this.generatePower();
			},
		});
	}

	generatePower() {
		const pascalPower = this.scene.powerShootGroup.get(this.x, this.y, this.powerType);
		if (!pascalPower) return;

		this.scene.tweens.add({
			targets: pascalPower,
			ease: "Linear",
			duration: 250,
			y: { from: this.y, to: this.y - this.height * 2 },
			onComplete: () => {
				pascalPower.generate();
			},
		});
	}
}
