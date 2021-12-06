const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const GlobalConfigs = {
	screen: {
		width: 1280,
		height: 720, // 16:9 // https://calculateaspectratio.com
		middleWidth: 0,
		middleHeight: 0,
	},
	debug: params.debug == "false" || params.debug == undefined ? false : true,
	language: "en",
	controllers: {
		platform: {
			left1: "LEFT",
			left2: "A",
			right1: "RIGHT",
			right2: "D",
			jump1: "UP",
			jump2: "W",
			down1: "DOWN",
			down2: "S",
			shoot: "SPACE",
		},
		shootUp: {
			shoot: "SPACE",
		}
	},
};

GlobalConfigs.screen.middleWidth = GlobalConfigs.screen.width / 2;
GlobalConfigs.screen.middleHeight = GlobalConfigs.screen.height / 2;

export default GlobalConfigs;
