import { arrayChoice } from "201flaviosilva-utils";
import GlobalConfigs from "../../Configs";

export class Enemy extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, sprite) {
		super(scene, x, y, sprite);
		this.type = sprite;
	}

	kill() { this.destroy(); }
}

export default class EnemyGroup extends Phaser.Physics.Arcade.Group {
	constructor(world, scene) {
		const config = {
			classType: Enemy,
			runChildUpdate: true,
		};
		super(world, scene, config);

		this.generateAllEnemies();
	}

	generateAllEnemies() {
		for (let i = 0; i < 5; i++) { // Number of lines
			for (let j = 0; j < 20; j++) { // Number os columns
				const sprite = arrayChoice(GlobalConfigs.gamingSprites);
				this.getNewEnemy(j * 50 + 100 + i * 2, i * 50 + 20, sprite);
			}
		}

		this.setVelocityX(100);
	}

	getNewEnemy(x = 0, y = 0, sprite = "Sprite") {
		const newEnemy = this.get(x, y, sprite);
		return newEnemy;
	}
}
