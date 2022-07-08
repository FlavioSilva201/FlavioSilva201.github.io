import { getUrlParameter } from "201flaviosilva-utils";

const debugParam = getUrlParameter("debug");

const GlobalConfigs = {
	screen: {
		width: 1280,
		height: 720, // 16:9 // https://calculateaspectratio.com
		middleWidth: 0,
		middleHeight: 0,
	},
	debug: debugParam == "false" || debugParam == undefined ? false : true,
	language: "en",
	controllers: {
		start: {
			left1: "LEFT",
			left2: "A",
			right1: "RIGHT",
			right2: "D",
			acceleration1: "UP",
			acceleration2: "W",
			back1: "DOWN",
			back2: "S",
		},
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
		},
	},
};

GlobalConfigs.screen.middleWidth = GlobalConfigs.screen.width / 2;
GlobalConfigs.screen.middleHeight = GlobalConfigs.screen.height / 2;

export default GlobalConfigs;
