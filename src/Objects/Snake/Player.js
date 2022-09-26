import GlobalConfigs from "../../Configs";
import EventSystem, { EVENTS_NAMES } from "../Common/EventSystem";

const DIRECTIONS = {
	UP: "up",
	DOWN: "down",
	LEFT: "left",
	RIGHT: "right"
}
const TILE_SIZE = GlobalConfigs.snakeTileSize;
const SNAKE_NORMAL_SPEED = 150;

export default class Player {
	constructor(scene, x, y) {
		this.scene = scene;

		this.headPosition = new Phaser.Geom.Point(x, y); // Vector2 ?
		this.body = new Body(scene, { classType: BodyElement, });
		this.head = this.body.create(x, y, "Duke", DIRECTIONS.RIGHT).setScale(0.5).setDepth(100);
		this.tail = new Phaser.Geom.Point(x, y);

		this.isAlive = true;
		this.speed = SNAKE_NORMAL_SPEED;
		this.moveTime = 0;

		this.heading = DIRECTIONS.RIGHT;
		this.direction = DIRECTIONS.RIGHT;

		this.keys = scene.input.keyboard.addKeys(GlobalConfigs.controllers.snake);
	}

	goUp() { if (this.direction !== DIRECTIONS.DOWN) this.heading = DIRECTIONS.UP; }
	goDown() { if (this.direction !== DIRECTIONS.UP) this.heading = DIRECTIONS.DOWN; }
	goLeft() { if (this.direction !== DIRECTIONS.RIGHT) this.heading = DIRECTIONS.LEFT; }
	goRight() { if (this.direction !== DIRECTIONS.LEFT) this.heading = DIRECTIONS.RIGHT; }

	update(time) {
		const { isAlive, keys } = this;
		if (!isAlive || !keys) return;

		const { left1, left2, right1, right2, up1, up2, down1, down2, boost1, boost2 } = keys;

		// Directions
		if (left1.isDown || left2.isDown) this.goLeft();
		else if (right1.isDown || right2.isDown) this.goRight();
		else if (up1.isDown || up2.isDown) this.goUp();
		else if (down1.isDown || down2.isDown) this.goDown();

		// Boost
		if (boost1.isDown || boost2.isDown) this.speed = SNAKE_NORMAL_SPEED / 2;
		else this.speed = SNAKE_NORMAL_SPEED;


		this.move(time);
	}

	move(time) {
		if (time < this.moveTime) return;

		const { main } = this.scene.cameras;
		const MAX_WIDTH = Math.floor(main.width / TILE_SIZE);
		const MAX_HEIGHT = Math.floor(main.height / TILE_SIZE);

		switch (this.heading) {
			case DIRECTIONS.LEFT:
				this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 1, MAX_WIDTH);
				break;

			case DIRECTIONS.RIGHT:
				this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 1, MAX_WIDTH);
				break;

			case DIRECTIONS.UP:
				this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 1, MAX_HEIGHT);
				break;

			case DIRECTIONS.DOWN:
				this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 1, MAX_HEIGHT);
				break;
		}

		Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * TILE_SIZE, this.headPosition.y * TILE_SIZE, 1, this.tail);

		this.direction = this.heading;
		this.moveTime = time + this.speed;

		// Check if player collided with body
		if (Phaser.Actions.GetFirst(this.body.getChildren(), { x: this.head.x, y: this.head.y }, 1)) {
			this.isAlive = false;
			EventSystem.emit(EVENTS_NAMES.gameOver);
			return;
		}

		// Change individual body elements direction
		this.body.getFirst(true).setDirection(this.heading);
		const reversedBody = this.body.getChildren().slice().reverse();
		for (let i = 0; i < reversedBody.length - 1; i++) {
			reversedBody[i].setDirection(reversedBody[i + 1].direction);
		}
	}

	grow(spriteName) {
		// this.body.create(this.tail.x, this.tail.y, spriteName); // Use Apple Language
		this.body.create(this.tail.x, this.tail.y, "Duke", this.body.getLast(true).direction).setScale(0.5); // Duke
	}
}

export class Body extends Phaser.GameObjects.Group {
	constructor(scene, config) {
		super(scene, config);
		scene.add.existing(this);
	}

	create(x, y, sprite, direction = DIRECTIONS.RIGHT) {
		const body = new BodyElement(this.scene, x, y, sprite, direction);
		this.add(body);
		return body;
	}
}

export class BodyElement extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, sprite, direction) {
		super(scene, x, y, sprite, 0);
		scene.add.existing(this);

		this.direction = direction;
		this.updateDirection();
	}

	setDirection(direction) {
		this.direction = direction;
		this.updateDirection();
	}

	updateDirection() {
		switch (this.direction) {
			case DIRECTIONS.LEFT:
				this.setAngle(-90);
				break;

			case DIRECTIONS.RIGHT:
				this.setAngle(90);
				break;

			case DIRECTIONS.UP:
				this.setAngle(0);
				break;

			case DIRECTIONS.DOWN:
				this.setAngle(180);
				break;
		}
	}
}
