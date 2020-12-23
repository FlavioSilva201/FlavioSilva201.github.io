export function randomNumber(min = 0, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export function randomColor() { return Math.floor(Math.random() * 251); }