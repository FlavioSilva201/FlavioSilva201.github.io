const canvas = document.getElementById("Canvas");
const ctx = canvas.getContext("2d");

const canvasWidth = canvas.width = window.innerWidth;
const canvasHeight = canvas.height = window.innerHeight;

const playerWidth = 50;
const playerHeight = 50;
let playerX = canvasWidth / 2 + playerWidth / 2;
let playerY = canvasHeight - playerHeight * 2;


const imgUrl = "../../Assets/img/Games/Space/";
let playerImg = new Image();
playerImg.src = imgUrl + "Up.png";


const speed = 10;

setInterval(draw, 1);
function draw() {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	ctx.drawImage(playerImg, playerX, playerY, playerWidth, playerHeight);
}

document.addEventListener("keydown", (e) => playerMove(e));
function playerMove(e) {
	const keyCode = e.keyCode;
	if ((keyCode === 37 || keyCode === 65) && playerX >= playerWidth) {
		playerX -= speed;
		playerImg.src = imgUrl + "Left.png";
	}
	else if ((keyCode === 39 || keyCode === 68) && playerX <= canvasWidth - playerWidth - speed) {
		playerX += speed;
		playerImg.src = imgUrl + "Right.png";
	}
	else if ((keyCode === 38 || keyCode === 87) && playerY >= playerHeight) {
		playerY -= speed;
		playerImg.src = imgUrl + "Up.png";
	}
	else if ((keyCode === 40 || keyCode === 83) && playerY <= canvasHeight - playerHeight - speed) {
		playerY += speed;
		playerImg.src = imgUrl + "Down.png";
	}
}
