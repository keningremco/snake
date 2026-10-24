import Screen from "./screen.js";

export default class Game{
    constructor(width, height, element){
        this.screen = new Screen(width, height, element);
        this.running = false;
        this.tickRate = 150;
        this.interval = 0;
    }
    start() {
        if (this.running) return;
        
        this.running = true;

        this.interval = setInterval(() => {
            this.update();
            this.render();
        }, this.tickRate);
    }

    update(){

    }
    render(){
        this.screen.draw();
    }

    stop(){
        this.running = false;
        clearInterval(this.interval);
        this.interval = null;
    }
}