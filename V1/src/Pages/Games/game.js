const canvas = document.getElementById("Canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = window.innerWidth;
const CANVAS_HEIGHT = canvas.height = window.innerHeight;

const SPEED = 10;
const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 50;
let playerX = CANVAS_WIDTH / 2 + PLAYER_WIDTH / 2;
let playerY = CANVAS_HEIGHT - PLAYER_HEIGHT * 2;

const imgUrl = "../../Assets/img/Games/Space/";
let playerImg = new Image();
playerImg.src = imgUrl + "Up.png";


requestAnimationFrame(render);
function render() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	ctx.drawImage(playerImg, playerX, playerY, PLAYER_WIDTH, PLAYER_HEIGHT);
	requestAnimationFrame(render);
}

document.addEventListener("keydown", playerMove);
function playerMove({ keyCode, }) {
	if ((keyCode === 37 || keyCode === 65) && playerX >= 0) {
		playerX -= SPEED;
		playerImg.src = imgUrl + "Left.png";
	} else if ((keyCode === 39 || keyCode === 68) && playerX <= CANVAS_WIDTH - PLAYER_WIDTH - SPEED) {
		playerX += SPEED;
		playerImg.src = imgUrl + "Right.png";
	} else if ((keyCode === 38 || keyCode === 87) && playerY >= 0) {
		playerY -= SPEED;
		playerImg.src = imgUrl + "Up.png";
	} else if ((keyCode === 40 || keyCode === 83) && playerY <= CANVAS_HEIGHT - PLAYER_HEIGHT - SPEED) {
		playerY += SPEED;
		playerImg.src = imgUrl + "Down.png";
	}
}
