import { range, randomInt } from "201flaviosilva-utils";

// Player
export function generatePlayerParticles(scene, player, x = 0, y = 0) {
	const PLAYER_SHIP_PARTICLES = scene.add.particles("PlayerShip");
	const SQUARES_PARTICLES = scene.add.particles("SquaresParticles");

	// Explosion
	const explosionEmitter1 = SQUARES_PARTICLES.createEmitter({
		x: 0, y: 0,
		frame: range(0, 9),
		quantity: 1,
		frequency: -1,
		scale: { start: 0.5, end: 0 },
		alpha: { start: 0.5, end: 0 },
		speed: { min: 50, max: 150 },
		rotate: { start: 0, end: 360 },
		lifespan: { min: 250, max: 500 },
	});

	const hittedEmitter = PLAYER_SHIP_PARTICLES.createEmitter({
		follow: player,
		quantity: 64,
		frequency: -1,
		scale: { start: 0.75, end: 0 },
		alpha: { start: 0.75, end: 0 },
		angle: { start: 0, end: 360, steps: 64 },
		rotate: { start: randomInt(-360, 360), end: randomInt(-360, 360) },
		speed: { min: 500, max: 750 },
		lifespan: 500,
	});

	// Move Player Ship
	const moveEmitter1 = PLAYER_SHIP_PARTICLES.createEmitter({
		follow: player,
		quantity: 1,
		speedX: { min: -500, max: -250 },
		speedY: { min: -250, max: 250 },
		scale: { start: 0.75, end: 0 },
		alpha: { start: 0.5, end: 0 },
		rotate: { start: 0, end: 360 },
		lifespan: { min: 100, max: 500 },
	});

	// Move Sprite Sheet
	const moveEmitterBaseConfig = {
		follow: player,
		moveToX: 0,
		alpha: { start: 0.5, end: 0.25 },
		deathCallback: ({ x, y }) => {
			explosionEmitter1.setPosition(x, y);
			explosionEmitter1.explode();
		},
	}
	const moveEmitter2A = SQUARES_PARTICLES.createEmitter({
		...moveEmitterBaseConfig,
		frame: range(0, 9),
		moveToY: { min: scene.scale.height / 2 - 150, max: scene.scale.height / 2 + 150 },
		scale: { start: 0.4, end: 0.25 },
		quantity: 4,
	});
	const moveEmitter2B = SQUARES_PARTICLES.createEmitter({
		...moveEmitterBaseConfig,
		frame: [3],
		moveToY: scene.scale.height / 2,
		scale: 0.4,
		quantity: 1,
	});

	return {
		explosionEmitter1,
		hittedEmitter,
		moveEmitter1,
		moveEmitter2A,
		moveEmitter2B,
	}
}

// Player Shoot
export function generatePlayerShootParticles(scene, shoot, sprite, x = 0, y = 0) {
	const moveParticles = scene.add.particles(sprite);
	const moveParticlesEmitter = moveParticles.createEmitter({
		x, y,
		follow: shoot,
		quantity: 1,
		speedX: { min: -500, max: -250 },
		speedY: { min: -250, max: 250 },
		scale: { start: 0.33, end: 0 },
		alpha: { start: 0.5, end: 0 },
		rotate: { start: 0, end: 360 },
		lifespan: { min: 100, max: 500 },
	});

	// Kill
	const explosionParticles = scene.add.particles(sprite);
	const explosionParticlesEmitter = explosionParticles.createEmitter({
		x, y,
		follow: shoot,
		quantity: 100,
		frequency: -1,
		scale: { start: 0.75, end: 0 },
		alpha: { start: 0.75, end: 0 },
		speed: { min: 50, max: 150 },
		rotate: { start: 0, end: 360 },
		lifespan: { min: 250, max: 750 },
	});

	return {
		moveParticles, moveParticlesEmitter,
		explosionParticles, explosionParticlesEmitter,
	};
}

// Enemy
export function generateEnemyParticles(scene, enemy, x = 0, y = 0) {
	const particles = scene.add.particles("Duke");
	const particlesEmitter = particles.createEmitter({
		x, y,
		follow: enemy,
		quantity: 1,
		frequency: 100,
		speedX: { min: 500, max: 250 },
		speedY: { min: 250, max: -250 },
		scale: { start: 0.5, end: 0 },
		alpha: { start: 0.5, end: 0 },
		rotate: { start: -90, end: randomInt(-360, 360) },
		lifespan: { min: 100, max: 500 },
	});

	const deadParticlesEmitter = particles.createEmitter({
		x, y,
		follow: enemy,
		quantity: 32,
		frequency: -1,
		scale: { start: 0.75, end: 0 },
		alpha: { start: 0.75, end: 0 },
		angle: { start: 0, end: 360, steps: 32 },
		rotate: { start: -90, end: 270 },
		tint: 0xff0000,
		speed: 200,
		lifespan: 500,
	});


	return {
		particles, particlesEmitter,
		deadParticlesEmitter,
	};
}
