import GlobalConfigs from '../Config/Configs';
export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "PlayerIdle");

		this.keys = this.scene.input.keyboard.addKeys(GlobalConfigs.controllers.platform);

		this.playerStatus = {
			velocity: 200,
			jumpForce: 300,
			shootType: null,
		};
	}

	createAnimations() {
		this.scene.anims.create({
			key: "PlayerIdle",
			frames: this.scene.anims.generateFrameNumbers("PlayerIdle"),
			defaultTextureKey: "PlayerIdle",
			frameRate: 2,
			repeat: -1,
		});

		this.scene.anims.create({
			key: "PlayerJump",
			frames: this.scene.anims.generateFrameNumbers("PlayerJump"),
			defaultTextureKey: "PlayerJump",
			frameRate: 4,
			repeat: -1,
		});

		this.scene.anims.create({
			key: "PlayerWalk",
			frames: this.scene.anims.generateFrameNumbers("PlayerWalk"),
			defaultTextureKey: "PlayerWalk",
			frameRate: 4,
			repeat: -1,
		});
	}

	generate() {
		this.createAnimations();
		this.scene.anims.play("PlayerJump", this);
		this.setZ(10);
	}

	update() {
		const keys = this.keys;

		// Move X
		if (keys.left.isDown) {
			this.setVelocityX(-this.playerStatus.velocity);
			this.setFlipX(true);
			if (this.body.onFloor() && this.anims.currentAnim.key !== "PlayerWalk") this.scene.anims.play("PlayerWalk", this);
		} else if (keys.right.isDown) {
			this.setVelocityX(this.playerStatus.velocity);
			this.setFlipX(false);
			if (this.body.onFloor() && this.anims.currentAnim.key !== "PlayerWalk") this.scene.anims.play("PlayerWalk", this);
		} else {
			this.setVelocityX(0);
			if (this.body.onFloor() && this.anims.currentAnim.key !== "PlayerIdle") this.scene.anims.play("PlayerIdle", this);
		}

		// Move Y
		if (keys.jump.isDown && this.body.onFloor()) {
			this.setVelocityY(-this.playerStatus.jumpForce);
			if (this.anims.currentAnim.key !== "PlayerJump") this.scene.anims.play("PlayerJump", this);
		} else if (keys.down.isDown) this.setVelocityY(this.playerStatus.jumpForce);

		if (keys.shoot.isDown) {
			console.log(this.playerStatus.shootType);
		}
	}
}