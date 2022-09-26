// Fonts
export const PressStart2P = "'Press Start 2P'";

export const Banner = {
	text: "#ffffff",
	background: [
		"#ffffff",
		"#0000ff",
		"#00ff00",
		"#ff0000",
		"#000000",
	],
};

export const BaseColors = {
	white: "#ffffff",
	black: "#000000",
	green: "#00dd00",
	platformBackground: "#E2F7FE"
};

export const TextStyle = {
	base: {
		fontFamily: PressStart2P,
		fontSize: 20,
		fill: BaseColors.white,
		stroke: BaseColors.black,
		strokeThickness: 1,
		boundsAlignH: "center",
		boundsAlignV: "middle",
		align: "center",
		shadow: {
			offsetX: 2,
			offsetY: 2,
			color: BaseColors.green,
			blur: 2,
			fill: true
		},
	},
	home: {
		menu: {
			normal: {
				fontFamily: PressStart2P,
				fontSize: 40,
				fill: BaseColors.green,
				stroke: BaseColors.white,
				strokeThickness: 2,
				shadow: {
					fill: false,
				},
			},
			over: {
				fontFamily: PressStart2P,
				fontSize: 60,
				fill: BaseColors.white,
				stroke: BaseColors.black,
				strokeThickness: 2,
				shadow: {
					offsetX: 0,
					offsetY: 0,
					color: BaseColors.green,
					blur: 20,
					fill: true
				},
			}
		}
	},
	web: {
		scoreLabel: {
			fontFamily: PressStart2P,
			fontSize: "32px",
			align: "center",
			color: "#ffff00",
		},
		updateScoreLabel: {
			fontFamily: PressStart2P,
			fontSize: "16px",
			align: "center",
		},
	},
	loading: {
		keys: {
			fontFamily: PressStart2P,
			fontSize: 20,
			fill: BaseColors.platformBackground,
		}
	},
	snake: {
		scoreLabel: {
			fontFamily: PressStart2P,
			fontSize: "32px",
			align: "center",
			color: "#ffff00",
		},
		updateScoreLabel: {
			fontFamily: PressStart2P,
			fontSize: "16px",
			align: "center",
		},
	},
	start: {},
	objects: {
		signals: {
			fontFamily: PressStart2P,
			fontSize: 16,
			fill: "#633E25",
			stroke: BaseColors.black,
			strokeThickness: 1,
		},
	},
	components: {
		animateTitle: {
			fontFamily: PressStart2P,
			fontSize: 80,
			fill: BaseColors.platformBackground,
			stroke: "#B5F1DB",
			strokeThickness: 2,
			shadow: {
				offsetX: 0,
				offsetY: 0,
				color: BaseColors.black,
				blur: 20,
				fill: true,
			},
		},
		progressBar: {
			fontFamily: PressStart2P,
			fontSize: 60,
			fill: BaseColors.white,
			stroke: BaseColors.black,
			strokeThickness: 2,
		},
	}
};
