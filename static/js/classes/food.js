import Vector from "./vector.js";

export default class Food{
    constructor(xp, x, y){
        this.xp = xp;
        this.location = new Vector(x, y);
        this.colour = 'blue';
    }
}

export class Apple extends Food {
    constructor( x, y) {
        super(5, x, y);
        this.colour = 'red';
    }
}

export class Body extends Food {
    constructor (x, y) {
        super(10, x, y);
        this.colour = 'yellow';
    }
}