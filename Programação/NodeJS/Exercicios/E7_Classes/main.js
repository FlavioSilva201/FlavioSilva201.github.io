function toDegrees(angle) {
    return angle / (Math.PI * 2) * 360;

}

class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    get distance() {
        const { x, y } = this;
        return Math.sqrt(x ** 2 + y ** 2);
    }

    set distance(distance) {
        const { angle } = this;
        this.x = Math.cos(angle) * distance;
        this.y = Math.sin(angle) * distance;
    }

    get angle() {
        const { x, y } = this;

        if (x === 0 && y === 0) return 0;

        const value = Math.atan(y / x);

        if (x < 0) return value + Math.PI;
        if (y < 0) return value + 2 * Math.PI;
        return value;
    }

    set angle(angle) {
        const { distance } = this;
        this.x = Math.cos(angle) * distance;
        this.y = Math.sin(angle) * distance;
    }
}

document.evaluate()
