import Player from "../Objects/Player";

export default class Home extends Phaser.Scene {
	constructor() {
		super({ key: "Home" });
	}

	create() {
		const playersGroup = this.physics.add.group({
			classType: Player,
			collideWorldBounds: true,
			runChildUpdate: true
		});

		playersGroup.get(500, 300);
	}
}
