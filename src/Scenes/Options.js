import GlobalConfigs from "../Config/Configs";

import Player from "../Objects/Player";
import Grass from "../Objects/Grass";

import OptionsButton from "../Components/OptionsButton";

export default class Options extends Phaser.Scene {
	constructor() {
		super({ key: "Options" });
	}

	init(data) {
		this.lastScene = data.sceneName;
	}

	create() {
		this.createWorld();
		this.createUI();
		this.createPlayer();
		this.createCollision();
	}

	createWorld() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;

		this.grassGroup = this.physics.add.staticGroup({ classType: Grass });
		const scaleWidth = width / 32;
		this.grassGroup.get(middleWidth, height - 16).setScale(scaleWidth, 1).refreshBody();
	}

	createUI() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;
		this.optionsGroup = this.physics.add.staticGroup({
			classType: OptionsButton,
			runChildUpdate: true,
		});

		const yLevel1 = height - 175;
		const yLevel2 = height - 225;

		{ // Language Button
			const x = width * 0.25;
			this.languageButton = this.optionsGroup.get(x, yLevel1);
			this.languageButton.generate({
				x: x,
				y: yLevel1,
				image: "Flags",
			});
		}

		{ // FullScreen Button
			const x = middleWidth;
			this.fullScreenButton = this.optionsGroup.get(x, yLevel2);
			this.fullScreenButton.generate({
				x: x,
				y: yLevel2,
				image: "FullScreen",
			});
		}

		{ // Sound Button
			const x = width * 0.75;
			this.soundButton = this.optionsGroup.get(x, yLevel1);
			this.soundButton.generate({
				x: x,
				y: yLevel1,
				image: "Sound",
			});
		}
	}

	createPlayer() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;
		this.playersGroup = this.physics.add.group({
			classType: Player,
			collideWorldBounds: true,
			runChildUpdate: true
		});
		this.player = this.playersGroup.get(middleWidth, middleHeight);
		this.player.generate();

		if (this.lastScene === "Start") this.player.setX(width - 50);
		else if (this.lastScene === "Credits") this.player.setX(50);
		else this.player.setX(middleWidth);
	}

	createCollision() {
		this.physics.add.collider(this.grassGroup, this.player);
		this.physics.add.collider(this.optionsGroup, this.player);
	}

	update() {
		if (this.player.x > GlobalConfigs.screen.width - this.player.width * 0.75) {
			this.scene.start("Start");
			this.scene.stop();
		} else if (this.player.x < 0 + this.player.width * 0.75) {
			this.scene.start("Credits");
			this.scene.stop();
		}
	}
}
