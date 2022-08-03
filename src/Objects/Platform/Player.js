import GlobalConfigs from "../../Configs";

import Shoot from "./Shoot";

export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "PlayerIdle");

		this.keys = this.scene.input.keyboard.addKeys(GlobalConfigs.controllers.platform);

		this.playerStatus = {
			velocity: 200,
			jumpForce: 300,
			shootType: null,
			lastShot: 0,
		};

		this.shoots = this.scene.physics.add.group({
			classType: Shoot,
			runChildUpdate: true
		});
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

	update(time) {
		if (!this.keys) return;
		const keys = this.keys;
		const { velocity, jumpForce, shootType, lastShot: lastShoot } = this.playerStatus;

		if (!lastShoot) this.playerStatus.lastShot = time;

		// Move X
		if (keys.left1.isDown || keys.left2.isDown) {
			this.setVelocityX(-velocity);
			this.setFlipX(true);
			if (this.body.onFloor() && this.anims.currentAnim.key !== "PlayerWalk") this.scene.anims.play("PlayerWalk", this);
		} else if (keys.right1.isDown || keys.right2.isDown) {
			this.setVelocityX(velocity);
			this.setFlipX(false);
			if (this.body.onFloor() && this.anims.currentAnim.key !== "PlayerWalk") this.scene.anims.play("PlayerWalk", this);
		} else {
			this.setVelocityX(0);
			if (this.body.onFloor() && this.anims.currentAnim.key !== "PlayerIdle") this.scene.anims.play("PlayerIdle", this);
		}

		// Move Y
		if ((keys.jump1.isDown || keys.jump2.isDown) && this.body.onFloor()) {
			this.setVelocityY(-jumpForce);
			if (this.anims.currentAnim.key !== "PlayerJump") this.scene.anims.play("PlayerJump", this);
		} else if (keys.down1.isDown || keys.down2.isDown) this.setVelocityY(jumpForce);

		if (keys.shoot.isDown && shootType && lastShoot < time) {
			this.playerStatus.lastShot = time + 250;

			const shoot = this.shoots.get(this.x + this.width / 2, this.y, shootType);
			if (shoot) shoot.generate(this.flipX);
		}
	}
}
