import GlobalConfigs from "../Configs";

import AnimateTitle from "../Components/AnimatedTitle";
import StarsBackground from "../Components/StarsBackground";
import Tutorial from "../Components/Tutorial";

import Player from "../Objects/Home/Player";

export default class Start extends Phaser.Scene {
	constructor() {
		super({ key: "Start", });
	}

	create() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;
		this.input.keyboard.removeAllListeners();

		// Background
		const background = new StarsBackground(this);

		// Title
		const title = new AnimateTitle(this, middleWidth, 100, "201flaviosilva");

		const playersGroup = this.physics.add.group({
			classType: Player,
			runChildUpdate: true,
			collideWorldBounds: true,
		});
		this.player = playersGroup.get(middleWidth, middleHeight);

		{ // Settings
			const settings = this.physics.add.image(10, 10, "Settings", 1).setOrigin(0);
			this.physics.add.collider(this.player, settings, () => { this.scene.start("Options"); });
		}

		{ // Pascal/Lazarus
			const pascal = this.physics.add.image(middleWidth - 350, middleHeight - 100, "PascalZim").setScale(2);
			this.physics.add.collider(this.player, pascal, () => { this.scene.start("Pascal"); });
		}

		{ // Web
			const web = this.physics.add.image(middleWidth - 350, middleHeight + 100, "Web").setScale(4);
			this.physics.add.collider(this.player, web, () => { this.scene.start("Web"); });
		}

		{ // Snake All
			const scale = 3;
			this.snakeAll = this.add.tileSprite(middleWidth + 350, middleHeight - 100, 64, 32, "LangsSheet").setScale(scale);
			const t = this.add.zone(middleWidth + 350, middleHeight - 100, 64 * scale, 32 * scale);
			this.physics.world.enable(t);
			this.physics.add.collider(this.player, t, () => { this.scene.start("SnakeAll"); });
		}

		{ // Gaming
			const gaming = this.physics.add.image(middleWidth + 350, middleHeight + 100, "Comando").setScale(6);
			this.physics.add.collider(this.player, gaming, () => { this.scene.start("Gaming"); });
		}

		{ // Tutorial
			const tutorial = new Tutorial(this, middleWidth - 75, height - 120, "Start").setScale(0.5);
		}
	}

	update(time, delta) {
		this.snakeAll.tilePositionX += 0.025 * delta;
	}
}
