export default class Button extends Phaser.GameObjects.Sprite {
	constructor(scene, config) {
		// check if config contains a scene
		if (!scene) {
			console.error("Missing scene!");
			return;
		}

		config.key = config.key || "Button";

		if (!config.up) config.up = 0;
		if (config.down < 0) config.down = config.up;
		if (config.over < 0) config.over = config.up;

		super(scene, 0, 0, config.key, config.up);
		scene.add.existing(this);

		config.x && this.setPosition(config.x, config.y);
		this.config = config;

		if (config.text) {
			this.label = scene.add.text(this.x, this.y, config.text, config.textStyle).setOrigin(0.5);
		}

		this.setInteractive({ useHandCursor: true, });
		this.on("pointerdown", this._onDown, this);
		this.on("pointerup", this._onUp, this);
		this.on("pointerover", this._onOver, this);
		this.on("pointerout", this._onOut, this);
	}

	changeVisibility(isVisible = true) {
		this.setVisible(isVisible);
		this.label && this.label.setVisible(isVisible);
		return this;
	}

	_onDown() {
		this.setFrame(this.config.down);
		this.config.downCallback && this.config.downCallback();
	}

	_onOver() {
		this.setFrame(this.config.over);
		this.config.overCallback && this.config.overCallback();
	}

	_onUp() {
		this.setFrame(this.config.up);
		this.config.upCallback && this.config.upCallback();
	}

	_onOut() {
		this.setFrame(this.config.up);
	}

	kill() {
		this.label && this.label.destroy();
		this.destroy();
	}
}
