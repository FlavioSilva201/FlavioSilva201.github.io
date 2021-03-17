import ProgressBar from "../Components/ProgressBar";

// -------- Imgs --------
// ---- Sprites ----
import Player from "../Assets/Img/Sprites/Player.png";
import Sprite from "../Assets/Img/Sprites/Sprite.png";
import Grass from "../Assets/Img/Sprites/Grass.png";

// ---- UI ----
// -- Options --
import Flags from "../Assets/Img/UI/Options/Flags/Flags.png";
import FullScreen from "../Assets/Img/UI/Options/FullScreen/FullScreen.png";
import Sound from "../Assets/Img/UI/Options/Sound/Sound.png";

export default class Preload extends Phaser.Scene {
	constructor() {
		super({ key: "Preload" });
	}

	preload() {
		const progressBar = new ProgressBar(this);

		this.importSprites();
		this.importUI();
		this.importSounds();

		this.load.on('progress', (p) => progressBar.updateBar(p));
		this.load.on("fileprogress", (f) => progressBar.fileLoad(f));

		this.load.on('complete', () => {
			progressBar.complete();
			this.scene.start("Home");
			// this.scene.start("Start");
			// this.scene.start("Options");
		});
	}

	importSprites() {
		this.load.image("Sprite", Sprite);
		this.load.image("Player", Player);
		this.load.image("Grass", Grass);
	}

	importUI() {
		this.load.spritesheet("Flags", Flags, { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet("FullScreen", FullScreen, { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet("Sound", Sound, { frameWidth: 32, frameHeight: 32 });
	}

	importSounds() { }
}
