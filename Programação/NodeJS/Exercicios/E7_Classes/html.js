class A {
    constructor(z = 42) {
        this.z = z;
    }

    a() {
        console.log('this is an A');
    }
}

class B extends A {
    constructor(x, y) {
        super(42);
        this.x = x;
        this.y = y;
    }
}


const b = new B(1, 2);

console.log(b);