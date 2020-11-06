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
		const x = randomNumber(0, canvasWidth);
		this.size = randomNumber(5, 25);
		this.x = x;
		this.y = canvasHeight + this.size;
		this.startX = x;
		this.speedX = randomNumber(-1, 1);
		this.color = "rgb(" + randomColor() + "," + randomColor() + "," + randomColor() + ")";
	}
}

setInterval(() => balls.push(new Ball()), 250);
setInterval(() => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	balls.forEach((b, index) => {
		b.y--;
		if (b.y + b.size < 0) balls.splice(index, 1);
		b.x += b.speedX;
		if ((b.startX - 50 > b.x) || (b.startX + 50 < b.x)) b.speedX *= -1;
		collisionDetection(b, index);
		ctx.beginPath();
		ctx.fillStyle = b.color;
		ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2, true);
		ctx.fill();

		// ctx.fillStyle = "white";
		// ctx.font = "10px monospace";
		// ctx.fillText(b.size, b.x, b.y);
	});
}, 10);

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
	else if (b.size < 15) score += 2;
	else if (b.size < 20) score += 3;
	else if (b.size < 25) score += 4;
	else if (b.size === 25) score += 5;
	document.getElementById("score").innerHTML = score;
}
