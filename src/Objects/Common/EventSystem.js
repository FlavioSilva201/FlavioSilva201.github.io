export const EVENTS_NAMES = {
	gameOver: "gameOver",
	restartGame: "restartGame",
	increaseScore: "increaseScore",
	updateScore: "updateScore",
};

const EventSystem = new Phaser.Events.EventEmitter();
export default EventSystem;
