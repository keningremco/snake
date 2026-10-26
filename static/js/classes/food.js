import Vector from "./vector.js";

export default class Food{
    constructor(xp, x, y){
        this.xp = xp;
        this.location = new Vector(x, y);
    }
}