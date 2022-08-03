export const EVENTS_NAMES = {
	playerDied: "playerDied",
	restartGame: "restartGame",
	increaseScore: "increaseScore",
};

const EventSystem = new Phaser.Events.EventEmitter();
export default EventSystem;
