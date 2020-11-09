import { randomNumber, randomColor } from "../../utils.js";

const canvas = document.getElementById("canvas");
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var ctx = canvas.getContext("2d");

const balls = [];
let score = 0;
let x = 0;
let y = 0;
document.addEventListener("mousemove", (event) => { x = event.clientX; y = event.clientY; });
document.addEventListener("click", (event) => { x = event.clientX; y = event.clientY; });

class Ball {
	constructor() {
		this.size = randomNumber(5, 25);
		const x = randomNumber(this.size, canvasWidth - this.size);
		this.x = x;
		this.y = canvasHeight + this.size;
		this.startX = x;
		this.speedX = randomNumber(-3, 3);
		this.color = "rgb(" + randomColor() + "," + randomColor() + "," + randomColor() + ")";
	}
}

setInterval(() => balls.push(new Ball()), 250);
setInterval(() => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	balls.forEach((b, index) => {
		ctx.beginPath();
		ctx.fillStyle = b.color;
		ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2, true);
		ctx.fill();

		// ctx.fillStyle = "white";
		// ctx.font = "10px monospace";
		// ctx.fillText(b.size, b.x, b.y);
	});
}, 1);
setInterval(() => {
	balls.forEach((b, index) => {
		b.y--;
		if (b.y + b.size < 0) balls.splice(index, 1);
		b.x += b.speedX;
		if ((b.startX - 50 > b.x) || (b.startX + 50 < b.x) || (b.x - b.size < 0) || (b.x + b.size > canvasWidth)) b.speedX *= -1;
		collisionDetection(b, index);
	})
}, 50);

function collisionDetection(b, index) {
	if (x > b.x - b.size && x < b.x + b.size &&
		y > b.y - b.size && y < b.y + b.size) {
		balls.splice(index, 1);
		balls.push(new Ball());
		updateScore(b);
	}
}

function updateScore(b) {
	if (b.size < 10) score++;
	else if (b.size < 15) score += 2 * Math.abs(b.speedX);
	else if (b.size < 20) score += 3 * Math.abs(b.speedX);
	else if (b.size < 25) score += 4 * Math.abs(b.speedX);
	else if (b.size === 25) score += 5 * Math.abs(b.speedX);
	document.getElementById("score").innerHTML = score;
}
