import ProgressBar from "../Components/ProgressBar";

// -------- Imgs --------
// ---- Sprites ----
// -- Player --
import PlayerIdle from "../Assets/Img/Sprites/Player/Idle/Idle.png";
import PlayerJump from "../Assets/Img/Sprites/Player/Jump/Jump.png";
import PlayerWalk from "../Assets/Img/Sprites/Player/Walk/Walk.png";
import Sprite from "../Assets/Img/Sprites/Sprite.png";

// -- Others --

// ---- Tileset (Map) ----
// -- Background --
import BGForest from "../Assets/Img/Tileset/Platformer Bundle/BG/BG.png";

// -- Tiles --
import Tiles from "../Assets/Img/Tileset/Platformer Bundle/Tiles/SpriteSheet/TilesHorizontal.png";

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
		this.importTileset();
		this.importUI();
		this.importSounds();

		this.load.on('progress', (p) => progressBar.updateBar(p));
		this.load.on("fileprogress", (f) => progressBar.fileLoad(f));

		this.load.on('complete', () => {
			progressBar.complete();
			// this.scene.start("Home");
			this.scene.start("Start");
			// this.scene.start("Options");
		});
	}

	importSprites() {
		// Player
		this.load.spritesheet("PlayerIdle", PlayerIdle, { frameWidth: 38, frameHeight: 44 });
		this.load.spritesheet("PlayerJump", PlayerJump, { frameWidth: 38, frameHeight: 44 });
		this.load.spritesheet("PlayerWalk", PlayerWalk, { frameWidth: 38, frameHeight: 46 });

		this.load.image("Sprite", Sprite);
	}

	importTileset() {
		this.load.image("BackgroundForest", BGForest);

		this.load.spritesheet("Tiles", Tiles, { frameWidth: 128, frameHeight: 128 });
	}

	importUI() {
		this.load.spritesheet("Flags", Flags, { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet("FullScreen", FullScreen, { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet("Sound", Sound, { frameWidth: 32, frameHeight: 32 });
	}

	importSounds() { }
}
