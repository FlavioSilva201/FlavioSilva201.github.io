import LangManager from "../Lang/LangManager";
import { TextStyle } from "../Theme";

export default class Tutorial extends Phaser.GameObjects.Container {
	constructor(scene, x, y, gameType) {
		super(scene, x, y);
		scene.add.existing(this);

		this.switchScene(gameType);

		// Destroy
		const spaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		spaceKey.removeAllListeners();
		spaceKey.on("down", () => { this.destroy(); }, this);

		// Fade out
		this.scene.tweens.add({
			targets: [this],
			alpha: { from: 1, to: 0 },
			duration: 10000,
			ease: "Circ.easeIn",
			onComplete: () => { this.destroy(); },
		});
	}

	switchScene(gameType) {
		switch (gameType) {
			case "Start": {
				this.startUI();
				break;
			}

			case "Pascal": {
				this.platformUI();
				break;
			}

			default: {
				break;
			}
		}
	}

	startUI() {
		const dimensions = { width: 300, height: 200, };

		const background = this.scene.add.graphics();
		background.clear();
		background.fillStyle(0x000000, 0.25);
		background.fillRoundedRect(0, 0, dimensions.width, dimensions.height, 10);
		this.add(background);

		const x = dimensions.width / 2;
		const y = dimensions.height / 2;
		const margin = 40;

		const labelRotation = this.scene.add.text(x, y - 90, LangManager.getText("moveRotate"), TextStyle.loading.keys).setOrigin(0.5);
		this.add(labelRotation);

		this.addKeyExample(x, y - margin, "ArrowKey", "UP"); // Up
		this.addKeyExample(x, y + margin, "ArrowKey", "DOWN").setFlipY(true); // Down		
		this.addKeyExample(x + margin * 2, y + margin, "ArrowKey", "RIGHT", 90); // Right
		this.addKeyExample(x - margin * 2, y + margin, "ArrowKey", "LEFT", -90); // Left		
	}

	platformUI() {
		const dimensions = { width: 300, height: 250, };

		const background = this.scene.add.graphics();
		background.clear();
		background.fillStyle(0x000000, 0.25);
		background.fillRoundedRect(0, 0, dimensions.width, dimensions.height, 10);
		this.add(background);

		const x = dimensions.width / 2;
		const y = dimensions.height / 2;
		const margin = 40;

		const labelMove = this.scene.add.text(x, y - 95, "Move", TextStyle.loading.keys).setOrigin(0.5);
		this.add(labelMove);

		this.addKeyExample(x, y - margin, "ArrowKey", "UP"); // Up
		this.addKeyExample(x, y + margin, "ArrowKey", "DOWN").setFlipY(true); // Down
		this.addKeyExample(x + margin * 2, y + margin, "ArrowKey", "RIGHT", 90); // Right
		this.addKeyExample(x - margin * 2, y + margin, "ArrowKey", "LEFT", -90); // Left
		this.addKeyExample(x, y + margin * 2.5, "SpaceKey", "SPACE", 0, "Shoot").setScale(2, 1); // Space
	}

	addKeyExample(x = 0, y = 0, texture = "ArrowKey", keyName = "UP", angle = 0, text = "") {
		const exampleKeySprite = this.scene.add.image(x, y, texture, 0).setAngle(angle);
		const exampleKeyCode = this.scene.input.keyboard.addKey(keyName);
		exampleKeyCode.on("down", () => { exampleKeySprite.setFrame(1); }, this);
		exampleKeyCode.on("up", () => { exampleKeySprite.setFrame(0); }, this);
		this.add(exampleKeySprite);

		if (text) {
			const label = this.scene.add.text(x, y, text, TextStyle.loading.keys).setOrigin(0.5);
			this.add(label);
		}

		return exampleKeySprite;
	}
}
