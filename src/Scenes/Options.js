import GlobalConfigs from "../Config/Configs";

import Player from "../Objects/Player";
import Grass from "../Objects/Grass";

import OptionsButton from "../Components/OptionsButton";

export default class Options extends Phaser.Scene {
	constructor() {
		super({ key: "Options" });
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
		this.grassGroup.get(middleWidth, height * 0.66).setScale(scaleWidth, 1).refreshBody();
	}

	createUI() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;
		this.optionsGroup = this.physics.add.staticGroup({
			classType: OptionsButton,
			runChildUpdate: true,
		});

		const y = height * 0.45;

		{ // Language Button
			const x = width * 0.25;
			this.languageButton = this.optionsGroup.get(x, y);
			this.languageButton.generate({
				x: x,
				y: y,
				image: "Flags",
			});
		}

		{ // FullScreen Button
			const x = middleWidth;
			this.fullScreenButton = this.optionsGroup.get(x, height * 0.4);
			this.fullScreenButton.generate({
				x: x,
				y: height * 0.4,
				image: "FullScreen",
			});
		}

		{ // Sound Button
			const x = width * 0.75;
			this.soundButton = this.optionsGroup.get(x, y);
			this.soundButton.generate({
				x: x,
				y: y,
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
		this.player = this.playersGroup.get(width - 50, middleHeight);
	}

	createCollision() {
		this.physics.add.collider(this.grassGroup, this.player);
		this.physics.add.collider(this.optionsGroup, this.player);
	}

	update() {
		if (this.player.x > GlobalConfigs.screen.width - this.player.width * 0.75) {
			this.scene.start("Start");
			this.scene.stop();
		}
	}
}
