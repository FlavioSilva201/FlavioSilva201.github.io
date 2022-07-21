export default class DebugFPS extends Phaser.GameObjects.Text {
	constructor(scene, x = 10, y = 10, text = 0, style = {}) {
		super(scene, x, y, text, style);
		scene.add.existing(this);
		this.setDepth(1000000);
	}

	preUpdate() {
		this.setText((this.scene.game.loop.actualFps).toFixed(2));
	}
}
