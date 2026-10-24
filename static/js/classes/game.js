import Screen from "./screen.js";

export default class Game{
    constructor(width, height, element){
        this.screen = new Screen(width, height, element);
        this.running = false;
        this.tickRate = 150;
        this.interval = 0;
        this.snakes = [];
    }
    start() {
        if (this.running) return;
        
        this.running = true;

        this.interval = setInterval(() => {
            this.update();
            this.render();
        }, this.tickRate);
    }

    addSnake(snake) {
        this.snakes.push(snake);
    }

    removeSnake(snake) {
        this.snakes = this.snakes.filter(s => s !== snake);
    }

    update(keys){
        for (const snake in this.snakes){
            snake.move(keys, game);
        }
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