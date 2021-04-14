import ProgressBar from "../Components/ProgressBar";

// -------- Imgs --------
// ---- Sprites ----
// -- Player --
import PlayerIdle from "../Assets/Img/Sprites/Player/Idle/Idle.png";
import PlayerJump from "../Assets/Img/Sprites/Player/Jump/Jump.png";
import PlayerWalk from "../Assets/Img/Sprites/Player/Walk/Walk.png";

// -- Power Up --
import PascalZim from "../Assets/Img/Sprites/Power/PascalZim/PascalZim.png";

// -- Enemy --
import Duke from "../Assets/Img/Sprites/Enemy/Duke/Duke.png";

// ---- Others ----
// -- Sprite --
import Sprite from "../Assets/Img/Sprites/Sprite.png";

// -- Sign Direction --
import Bush1 from "../Assets/Img/Tileset/PlatformerBundle/Object/Bush1.png";
import Bush2 from "../Assets/Img/Tileset/PlatformerBundle/Object/Bush2.png";
import Bush3 from "../Assets/Img/Tileset/PlatformerBundle/Object/Bush3.png";
import Bush4 from "../Assets/Img/Tileset/PlatformerBundle/Object/Bush4.png";

import Crate from "../Assets/Img/Tileset/PlatformerBundle/Object/Crate.png";

import Mushroom1 from "../Assets/Img/Tileset/PlatformerBundle/Object/Mushroom1.png";
import Mushroom2 from "../Assets/Img/Tileset/PlatformerBundle/Object/Mushroom2.png";

import SignDirection from "../Assets/Img/Tileset/PlatformerBundle/Object/SignDirection.png";

import Stone from "../Assets/Img/Tileset/PlatformerBundle/Object/Stone.png";

import Tree1 from "../Assets/Img/Tileset/PlatformerBundle/Object/Tree1.png";
import Tree2 from "../Assets/Img/Tileset/PlatformerBundle/Object/Tree2.png";
import Tree3 from "../Assets/Img/Tileset/PlatformerBundle/Object/Tree3.png";

// ---- Tileset (Map) ----
// -- Background --
import BGForest from "../Assets/Img/Tileset/PlatformerBundle/BG/BG.png";


// -- Tiles (SpriteSheet) --
import Tiles from "../Assets/Img/Tileset/PlatformerBundle/Tiles/SpriteSheet/Tiles.png";
import SkyTiles from "../Assets/Img/Tileset/PlatformerBundle/Tiles/SpriteSheet/SkyTiles.png";
import CalcadaPortuguesaTexture from "../Assets/Img/Tileset/CalcadaPortuguesaTexture/CalcadaPortuguesaTexture.png";

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
		this.importObjects();
		this.importTileset();
		this.importUI();
		this.importSounds();

		this.load.on('progress', (p) => progressBar.updateBar(p));
		this.load.on("fileprogress", (f) => progressBar.fileLoad(f));

		this.load.on('complete', () => {
			progressBar.complete();
			this.scene.start("Home");
			// this.scene.start("Start");
			// this.scene.start("Options");
			// this.scene.start("Credits");
			// this.scene.start("Loading");
			// this.scene.start("Pascal");
		});
	}

	importSprites() {
		// -- Player --
		this.load.spritesheet("PlayerIdle", PlayerIdle, { frameWidth: 38, frameHeight: 44 });
		this.load.spritesheet("PlayerJump", PlayerJump, { frameWidth: 38, frameHeight: 44 });
		this.load.spritesheet("PlayerWalk", PlayerWalk, { frameWidth: 38, frameHeight: 46 });

		// -- Pawers --
		this.load.image("PascalZim", PascalZim);

		// -- Enemy --
		this.load.image("Duke", Duke);


		// -- Others --
		this.load.image("Sprite", Sprite);
	}

	importObjects() {
		this.load.image("Bush1", Bush1);
		this.load.image("Bush2", Bush2);
		this.load.image("Bush3", Bush3);
		this.load.image("Bush4", Bush4);

		this.load.image("Crate", Crate);

		this.load.image("Mushroom1", Mushroom1);
		this.load.image("Mushroom2", Mushroom2);

		this.load.image("SignDirection", SignDirection);

		this.load.image("Stone", Stone);

		this.load.image("Tree1", Tree1);
		this.load.image("Tree2", Tree2);
		this.load.image("Tree3", Tree3);
	}

	importTileset() {
		this.load.image("BackgroundForest", BGForest);

		this.load.spritesheet("Tiles", Tiles, { frameWidth: 128, frameHeight: 128 });
		this.load.spritesheet("SkyTiles", SkyTiles, { frameWidth: 128, frameHeight: 93 });

		this.load.spritesheet("CalcadaPortuguesa", CalcadaPortuguesaTexture, { frameWidth: 128, frameHeight: 128 });
	}

	importUI() {
		this.load.spritesheet("Flags", Flags, { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet("FullScreen", FullScreen, { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet("Sound", Sound, { frameWidth: 32, frameHeight: 32 });
	}

	importSounds() { }
}
