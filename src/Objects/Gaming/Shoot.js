import GlobalConfigs from "../../Configs";

import { generatePlayerShootParticles } from "./Particles";

export class Shoot extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, sprite) {
		super(scene, x, y, sprite);
		scene.physics.add.existing(this);

		if (sprite === "Phaser") this.setAngle(-90);
		this.type = sprite;
		this.speed = -400;
		this.setDepth(1);

		// Particles
		const { moveParticles, moveParticlesEmitter } = generatePlayerShootParticles(scene, this, sprite, x, y);
		this.moveParticles = moveParticles;
		this.moveParticlesEmitter = moveParticlesEmitter;
	}

	preUpdate() {
		if (0 > this.y) this.kill();
	}

	kill() {
		this.moveParticlesEmitter.stop();
		this.moveParticles.destroy();

		this.destroy();
	}
}

export default class ShootGroup extends Phaser.Physics.Arcade.Group {
	constructor(world, scene) {
		const config = {
			classType: Shoot,
			runChildUpdate: true,
		};
		super(world, scene, config);

		this.lastIndex = 0;
	}

	getNewShoot(x = 0, y = 0) {
		const selected = arrayGetNext(GlobalConfigs.gamingSprites, this.lastIndex);
		this.lastIndex = selected.index;
		const shoot = this.get(x, y, selected.element);
		shoot.setVelocityY(shoot.speed);
		return shoot;
	}
}

function arrayGetNext(array, index = 0) {
	if (array.length === index + 1) return { element: array[0], index: 0 };
	return { element: array[index + 1], index: index + 1 };
}
