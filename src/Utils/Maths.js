// JS Utils
// Numbers
export function randomNumber(min, max) {
	if (!max) {
		max = min;
		min = 0;
	}
	return Math.floor(Math.random() * (max - min + 1) + min);
};
export function randomNumberDecimal(min, max, places) {
	const value = (Math.random() * (max - min + 1)) + min;
	return Number.parseFloat(value).toFixed(places);
}

// Radians and Degrees
export const radiansToDegrees = r => r * (180 / Math.PI);
export const degreesToRadians = d => d * (Math.PI / 180);

// Sort Numbers
export const sortAscending = arr => arr.sort((a, b) => a - b);
export const sortDescending = arr => arr.sort((a, b) => b - a);
