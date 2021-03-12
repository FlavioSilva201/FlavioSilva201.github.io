// Fonts
const PressStart2P = "'Press Start 2P'";

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
};

export const TextStyle = {
	base: {
		fontFamily: PressStart2P,
		fontSize: 40,
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
	progressBar: {
		fontFamily: PressStart2P,
		fontSize: 60,
		fill: BaseColors.white,
		stroke: BaseColors.black,
		strokeThickness: 2,
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
};
