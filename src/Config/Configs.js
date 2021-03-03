const GlobalConfigs = {
	screen: {
		width: 1000,
		height: 800,
		middleWidth: 0,
		middleHeight: 0,
	},
	debug: false,
	language: "en",
	controllers: {
		left: "LEFT",
		right: "RIGHT",
		up: "UP",
		down: "DOWN",
	},
};

GlobalConfigs.screen.middleWidth = GlobalConfigs.screen.width / 2;
GlobalConfigs.screen.middleHeight = GlobalConfigs.screen.height / 2;

export default GlobalConfigs;
