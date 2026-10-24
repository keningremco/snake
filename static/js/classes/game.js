import Screen from "./screen.js";

export default class Game{
    constructor(width, height){
        this.screen = new Screen(width, height);
        this.running = true;
    }
}