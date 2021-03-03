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

export const TextStyle = {
	base: {
		fontFamily: PressStart2P,
		fontSize: 20,
		fill: "#fff",
		stroke: "#000",
		strokeThickness: 1,
		boundsAlignH: "center",
		boundsAlignV: "middle",
		align: "center",
		shadow: {
			offsetX: 2,
			offsetY: 2,
			color: "#023b02",
			blur: 2,
			fill: true
		},
	},
	progressBar: {
		fontFamily: PressStart2P,
		fontSize: 30,
		fill: "#fff",
		stroke: "#000",
		strokeThickness: 2,
	}
};
