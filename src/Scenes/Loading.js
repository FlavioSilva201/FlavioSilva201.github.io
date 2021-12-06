import GlobalConfigs from "../Configs";

import { TextStyle } from "../Theme";

import AnimateTitle from "../Components/AnimatedTitle";

export default class Loading extends Phaser.Scene {
	constructor() {
		const config = {
			key: "Loading",
			active: false,
			physics: {
				default: "arcade",
				arcade: {
					gravity: { x: 0, y: 0, },
					debug: true,
				},
			},
		};
		super(config);
	}

	init(data) {
		const nextGame = data.nextGame || "Loading";

		this.nextGame = {
			name: nextGame,
		};
	}

	create() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;

		// -- Title
		const title = new AnimateTitle(this, middleWidth, middleHeight, this.nextGame.name);

		this.switchScene();

		// Keys Events
		const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		spaceKey.removeAllListeners();
		spaceKey.on("down", () => {
			this.scene.start(this.nextGame.name);
		}, this);

		this.add.text(middleWidth, height - 25, "Press Space to Start", TextStyle.loading.spaceStart).setOrigin(0.5);
	}

	switchScene() {
		switch (this.nextGame.name) {
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
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;
		// Player
		const xPlayer = middleWidth / 2;
		const yPlayer = middleHeight - 50;
		this.add.text(xPlayer, yPlayer, "Player", TextStyle.loading.keys).setOrigin(0.5);
		const player = this.physics.add.image(xPlayer, yPlayer + 50, "Sprite").setScale(1.5);

		{ // Keys
			const x = middleWidth + middleWidth / 2;
			const y = middleHeight + 50;
			const margin = 75;

			this.add.text(x, y - 125, "Move/Rotate", TextStyle.loading.keys).setOrigin(0.5);

			const upKey = this.add.image(x, y - margin, "ArrowKey", 0); // Up
			const rightKey = this.add.image(x + margin, y, "ArrowKey", 0).setAngle(90); // Right
			const leftKey = this.add.image(x - margin, y, "ArrowKey", 0).setAngle(-90); // Left

			{ // Key Events
				const upKeyCode = this.input.keyboard.addKey("UP");
				upKeyCode.removeAllListeners();
				upKeyCode.on("down", () => {
					upKey.setFrame(1);
				}, this);
				upKeyCode.on("up", () => upKey.setFrame(0), this);

				const rightKeyCode = this.input.keyboard.addKey("RIGHT");
				rightKeyCode.removeAllListeners();
				rightKeyCode.on("down", () => {
					rightKey.setFrame(1);
					player.setAngularVelocity(100);
				}, this);
				rightKeyCode.on("up", () => {
					rightKey.setFrame(0);
					player.setAngularVelocity(0);
				}, this);

				const leftKeyCode = this.input.keyboard.addKey("LEFT");
				leftKeyCode.removeAllListeners();
				leftKeyCode.on("down", () => {
					leftKey.setFrame(1);
					player.setAngularVelocity(-100);
				}, this);
				leftKeyCode.on("up", () => {
					leftKey.setFrame(0);
					player.setAngularVelocity(0);
				}, this);
			}
		}
	}

	platformUI() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;

		this.add.image(middleWidth, middleHeight, "BackgroundForest").setScale(1.3, 1).setAlpha(0.5);

		// Player
		const xPlayer = middleWidth / 2;
		const yPlayer = middleHeight - 50;
		this.add.text(xPlayer, yPlayer, "Player", TextStyle.loading.keys).setOrigin(0.5);
		const player = this.add.image(xPlayer, yPlayer + 50, "PlayerIdle").setScale(1.5);

		{ // Keys
			const x = middleWidth + middleWidth / 2;
			const y = middleHeight + 50;
			const margin = 75;

			this.add.text(x, y - 125, "Move", TextStyle.loading.keys).setOrigin(0.5);

			const upKey = this.add.image(x, y - margin, "ArrowKey", 0); // Up
			const downKey = this.add.image(x, y, "ArrowKey", 0).setFlipY(true); // Down
			const rightKey = this.add.image(x + margin, y, "ArrowKey", 0).setAngle(90); // Right
			const leftKey = this.add.image(x - margin, y, "ArrowKey", 0).setAngle(-90); // Left

			{ // Key Events
				const upKeyCode = this.input.keyboard.addKey("UP");
				upKeyCode.removeAllListeners();
				upKeyCode.on("down", () => {
					upKey.setFrame(1);
					player.setTexture("PlayerJump");
				}, this);
				upKeyCode.on("up", () => upKey.setFrame(0), this);

				const downKeyCode = this.input.keyboard.addKey("DOWN");
				downKeyCode.removeAllListeners();
				downKeyCode.on("down", () => downKey.setFrame(1), this);
				downKeyCode.on("up", () => downKey.setFrame(0), this);

				const rightKeyCode = this.input.keyboard.addKey("RIGHT");
				rightKeyCode.removeAllListeners();
				rightKeyCode.on("down", () => {
					rightKey.setFrame(1);
					player.setTexture("PlayerIdle");
					player.setFlipX(false);
				}, this);
				rightKeyCode.on("up", () => rightKey.setFrame(0), this);

				const leftKeyCode = this.input.keyboard.addKey("LEFT");
				leftKeyCode.removeAllListeners();
				leftKeyCode.on("down", () => {
					leftKey.setFrame(1);
					player.setTexture("PlayerIdle");
					player.setFlipX(true);
				}, this);
				leftKeyCode.on("up", () => leftKey.setFrame(0), this);
			}

			// Space
			this.add.image(x, y + 75, "SpaceKey");
			this.add.text(x, y + 75, "Shoot", TextStyle.loading.keys).setOrigin(0.5);
		}

		{ // Duke
			const x = middleWidth / 2;
			const y = middleHeight + 75;
			this.add.text(x, y, "Duke (Enemy)", TextStyle.loading.keys).setOrigin(0.5);
			this.add.image(x, y + 50, "Duke");
		}
	}
}
