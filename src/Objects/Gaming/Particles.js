import { range } from "201flaviosilva-utils";

// Player
export function generatePlayerParticles(scene, player) {
	const SQUARES_PARTICLES = scene.add.particles("SquaresParticles");

	// Explosion
	const explosionEmitter = SQUARES_PARTICLES.createEmitter({
		x: 0, y: 0,
		frame: range(0, 9),
		quantity: 50,
		frequency: -1,
		scale: { start: 1, end: 0 },
		alpha: { start: 1, end: 0 },
		speed: { min: 50, max: 150 },
		rotate: { start: 0, end: 360 },
		lifespan: 1000,
	});

	// Move Player Ship
	const moveEmitter = SQUARES_PARTICLES.createEmitter({
		follow: player,
		frame: range(0, 9),
		quantity: 1,
		speedX: { min: -100, max: 100 },
		speedY: { min: -20, max: 20 },
		scale: { start: 0.5, end: 0 },
		alpha: { start: 0.5, end: 0 },
		rotate: { min: -360, max: 360 },
		lifespan: { min: 100, max: 500 },
	});

	return { SQUARES_PARTICLES, explosionEmitter, moveEmitter, };
}

// Player Shoot
export function generatePlayerShootParticles(scene, shoot, sprite, x = 0, y = 0) {
	const moveParticles = scene.add.particles(sprite);

	const moveParticlesEmitter = moveParticles.createEmitter({
		x, y,
		follow: shoot,
		quantity: 1,
		speedX: { min: -100, max: 100 },
		speedY: { min: 100, max: 250 },
		scale: { start: 0.5, end: 0 },
		alpha: { start: 0.5, end: 0 },
		lifespan: { min: 100, max: 500 },
	});

	return { moveParticles, moveParticlesEmitter, };
}
