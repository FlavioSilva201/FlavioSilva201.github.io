export default class OptionsButton extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y);
	}

	generate(configs) {
		const { x, y, image, text, style, startFrame, actionCallback } = configs;

		this.realX = x;
		this.actionCallback = actionCallback;
		this.setPosition(x, y);
		this.setTexture(image);
		this.setFrame(startFrame || 0);

		this.body.setSize(0, 0, this.frame.width, this.frame.height); // Change HitBox

		this.label = this.scene.add.text(x, y, text, style).setOrigin(0.5);

		this.setInteractive({ useHandCursor: true });
		this.on("pointerup", () => this.action(actionCallback), this);
	}

	changeFrame(isYoyo = false) {
		this.setFrame(this.frame.name === 1 ? 0 : 1);

		if (isYoyo) setTimeout(() => this.changeFrame(), 1000);
	}

	changeVisible(visible = true) {
		this.setVisible(visible);
		this.label.setVisible(visible);
		this.setX(visible ? this.realX : -this.width);
	}

	action(callback) {
		console.log("Acting...");
		callback();
		this.changeFrame();
		this.changeVisible();
	}

	update() {
		if (this.body.touching.down) {
			this.action(this.actionCallback);
			this.body.touching.down = false;
		}
	}
}
