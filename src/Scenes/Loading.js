import GlobalConfigs from "../Configs";

import { TextStyle } from "../Theme";

import AnimateTitle from "../Components/AnimatedTitle";

export default class Loading extends Phaser.Scene {
	constructor() {
		super({ key: "Loading" });
	}

	init(data) {
		const nextGame = data.nextGame || "Loading";
		const gender = nextGame === "Pascal" ? "platform" : "shotUp";

		this.nextGame = {
			name: nextGame,
			gender: gender,
		};
	}

	create() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;

		if (this.nextGame.gender == "platform") this.platformUI();

		// -- Title
		const title = new AnimateTitle(this, middleWidth, middleHeight, this.nextGame.name);

		// Keys Events
		const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		spaceKey.removeAllListeners();
		spaceKey.on("down", () => {
			this.scene.start(this.nextGame.name);
		}, this);

		this.add.text(middleWidth, height - 25, "Press Space to Start", TextStyle.loading.spaceStart).setOrigin(0.5);
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
				const upKeyKode = this.input.keyboard.addKey("UP");
				upKeyKode.removeAllListeners();
				upKeyKode.on("down", () => {
					upKey.setFrame(1);
					player.setTexture("PlayerJump");
				}, this);
				upKeyKode.on("up", () => upKey.setFrame(0), this);

				const downKeyKode = this.input.keyboard.addKey("DOWN");
				downKeyKode.removeAllListeners();
				downKeyKode.on("down", () => downKey.setFrame(1), this);
				downKeyKode.on("up", () => downKey.setFrame(0), this);

				const rightKeyKode = this.input.keyboard.addKey("RIGHT");
				rightKeyKode.removeAllListeners();
				rightKeyKode.on("down", () => {
					rightKey.setFrame(1);
					player.setTexture("PlayerIdle");
					player.setFlipX(false);
				}, this);
				rightKeyKode.on("up", () => rightKey.setFrame(0), this);

				const leftKeyKode = this.input.keyboard.addKey("LEFT");
				leftKeyKode.removeAllListeners();
				leftKeyKode.on("down", () => {
					leftKey.setFrame(1);
					player.setTexture("PlayerIdle");
					player.setFlipX(true);
				}, this);
				leftKeyKode.on("up", () => leftKey.setFrame(0), this);
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
