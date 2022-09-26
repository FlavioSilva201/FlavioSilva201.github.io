import GlobalConfigs from "../Configs";
import ProgressBar from "../Components/ProgressBar";

// -------- Imgs --------
// -- Player --
import PlayerIdle from "../Assets/Img/Sprites/Player/Idle/Idle.png";
import PlayerJump from "../Assets/Img/Sprites/Player/Jump/Jump.png";
import PlayerWalk from "../Assets/Img/Sprites/Player/Walk/Walk.png";
import PlayerShip from "../Assets/Img/Sprites/Player/ShootUp/PlayerShip.png";

// -- Languages --
import CSS3 from "../Assets/Img/Sprites/Languages/CSS3/CSS3.png";
import Godot from "../Assets/Img/Sprites/Languages/Godot/Godot.png";
import HTML5 from "../Assets/Img/Sprites/Languages/HTML5/HTML5.png";
import JS from "../Assets/Img/Sprites/Languages/JS/JS.png";
import Lazarus from "../Assets/Img/Sprites/Languages/Lazarus/Lazarus.png";
import Pascal from "../Assets/Img/Sprites/Languages/Pascal/Pascal.png";
import PascalZim from "../Assets/Img/Sprites/Languages/PascalZim/PascalZim.png";
import PhaserLogo from "../Assets/Img/Sprites/Languages/Phaser/Phaser.png";
import React from "../Assets/Img/Sprites/Languages/React/React.png";
import SASS from "../Assets/Img/Sprites/Languages/SASS/SASS.png";
import VisualBasic from "../Assets/Img/Sprites/Languages/VisualBasic/VisualBasic.png";
import LangsSheet from "../Assets/Img/Sprites/Languages/SpriteSheet/Langs.png";

import Comando from "../Assets/Img/Sprites/Comando/Comando.png";
import Web from "../Assets/Img/Sprites/Web/Web.png";

// -- Enemy --
import Duke from "../Assets/Img/Sprites/Enemy/Duke/Duke.png";
import DukeLeft from "../Assets/Img/Sprites/Enemy/Duke/DukeLeft.png";

// -- Sprite --
import Sprite from "../Assets/Img/Sprites/Sprite.png";
import SquaresParticles from "../Assets/Img/Sprites/Particles/Quadrados.png";

// ---- Objects ----
import Bush1 from "../Assets/Img/Sprites/PlatformerBundle/Object/Bush1.png";
import Bush2 from "../Assets/Img/Sprites/PlatformerBundle/Object/Bush2.png";
import Bush3 from "../Assets/Img/Sprites/PlatformerBundle/Object/Bush3.png";
import Bush4 from "../Assets/Img/Sprites/PlatformerBundle/Object/Bush4.png";

import Cactus from "../Assets/Img/Sprites/PlatformerBundle/Object/Cactus.png";

import Castle from "../Assets/Img/Sprites/Castle/Castle.png";

import Crate from "../Assets/Img/Sprites/PlatformerBundle/Object/Crate.png";

import Mushroom1 from "../Assets/Img/Sprites/PlatformerBundle/Object/Mushroom1.png";
import Mushroom2 from "../Assets/Img/Sprites/PlatformerBundle/Object/Mushroom2.png";

import SignDirection from "../Assets/Img/Sprites/PlatformerBundle/Object/SignDirection.png";

import Stone from "../Assets/Img/Sprites/PlatformerBundle/Object/Stone.png";

import Tree1 from "../Assets/Img/Sprites/PlatformerBundle/Object/Tree1.png";
import Tree2 from "../Assets/Img/Sprites/PlatformerBundle/Object/Tree2.png";
import Tree3 from "../Assets/Img/Sprites/PlatformerBundle/Object/Tree3.png";

// -- Background --
import BGForest from "../Assets/Img/Sprites/PlatformerBundle/BG/BG.png";

// -- Tiles (SpriteSheet) --
import Tiles from "../Assets/Img/Sprites/PlatformerBundle/Tiles/SpriteSheet/Tiles.png";
import SkyTiles from "../Assets/Img/Sprites/PlatformerBundle/Tiles/SpriteSheet/SkyTiles.png";

// ---- UI ----
import StarsBackground from "../Assets/Img/UI/Background/StarsBackground.png";
import Button from "../Assets/Img/UI/Button/Button.png";
import Flags from "../Assets/Img/UI/Flags/Flags.png";
import FullScreen from "../Assets/Img/UI/FullScreen/FullScreen.png";
import Sound from "../Assets/Img/UI/Sound/Sound.png";
import Settings from "../Assets/Img/UI/Settings/Settings.png";

// ArrowKey
import ArrowKey from "../Assets/Img/UI/ArrowKey/ArrowKey.png";
import SpaceKey from "../Assets/Img/UI/SpaceKey/SpaceKey.png";


export default class Preload extends Phaser.Scene {
	constructor() {
		super({ key: "Preload" });
	}

	preload() {
		const progressBar = new ProgressBar(this);

		this.importSprites();
		this.importUI();
		this.importSounds();

		this.load.on("progress", (p) => progressBar.updateBar(p));
		this.load.on("fileprogress", (f) => progressBar.fileLoad(f));
		this.load.on("complete", () => { progressBar.complete(); });
	}

	importSprites() {
		// - Player
		this.load.spritesheet("PlayerIdle", PlayerIdle, { frameWidth: 38, frameHeight: 44 });
		this.load.spritesheet("PlayerJump", PlayerJump, { frameWidth: 38, frameHeight: 44 });
		this.load.spritesheet("PlayerWalk", PlayerWalk, { frameWidth: 38, frameHeight: 46 });
		this.load.image("PlayerShip", PlayerShip);

		// - Languages
		this.load.image("CSS3", CSS3);
		this.load.image("Godot", Godot);
		this.load.image("HTML5", HTML5);
		this.load.image("JS", JS);
		this.load.image("Lazarus", Lazarus);
		this.load.image("Pascal", Pascal);
		this.load.image("PascalZim", PascalZim);
		this.load.image("Phaser", PhaserLogo);
		this.load.image("React", React);
		this.load.image("SASS", SASS);
		this.load.image("VisualBasic", VisualBasic);
		this.load.image("LangsSheet", LangsSheet);

		this.load.image("Comando", Comando);
		this.load.image("Web", Web);

		// - Enemy
		this.load.image("Duke", Duke);
		this.load.image("DukeLeft", DukeLeft);

		this.load.image("Sprite", Sprite);
		this.load.spritesheet("SquaresParticles", SquaresParticles, { frameWidth: 32, frameHeight: 32 });

		// Objects
		this.load.image("Bush1", Bush1);
		this.load.image("Bush2", Bush2);
		this.load.image("Bush3", Bush3);
		this.load.image("Bush4", Bush4);

		this.load.image("Cactus", Cactus);
		this.load.image("Castle", Castle);

		this.load.image("Crate", Crate);

		this.load.image("Mushroom1", Mushroom1);
		this.load.image("Mushroom2", Mushroom2);

		this.load.image("SignDirection", SignDirection);

		this.load.image("Stone", Stone);

		this.load.image("Tree1", Tree1);
		this.load.image("Tree2", Tree2);
		this.load.image("Tree3", Tree3);

		// Tiles
		this.load.image("BackgroundForest", BGForest);

		this.load.spritesheet("Tiles", Tiles, { frameWidth: 128, frameHeight: 128 });
		this.load.spritesheet("SkyTiles", SkyTiles, { frameWidth: 128, frameHeight: 93 });
	}

	importUI() {
		this.load.image("StarsBackground", StarsBackground);

		this.load.spritesheet("Button", Button, { frameWidth: 250, frameHeight: 80 });
		this.load.spritesheet("Flags", Flags, { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet("FullScreen", FullScreen, { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet("Sound", Sound, { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet("Settings", Settings, { frameWidth: 32, frameHeight: 32 });

		this.load.spritesheet("ArrowKey", ArrowKey, { frameWidth: 64, frameHeight: 64 });
		this.load.spritesheet("SpaceKey", SpaceKey, { frameWidth: 128, frameHeight: 32 });
	}

	importSounds() { }

	create() {
		if (!GlobalConfigs.debug) this.scene.start("Index");
		else {
			this.scene.start("Start");
			// this.scene.start("Options");
			// this.scene.start("Pascal");
			// this.scene.start("Web");
			// this.scene.start("SnakeAll");
			// this.scene.start("Gaming");
		}
	}
}
