class Cenas {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    myFunction() {
        console.log('hello')
            // console.log(`this is a cenas: ${this.x} ${this.y}`);
    }

    toString() {
        return `Cenas { x: ${this.x}, y: ${this.y} }`;
    }

    static otherFunction() {

    }
}


Cenas.otherFunction()

var x = document.getElementById('cenas')