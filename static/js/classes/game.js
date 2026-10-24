import Screen from "./screen.js";

export default class Game{
    constructor(width, height, element){
        this.screen = new Screen(width, height, element);
        this.running = false;
        this.tickRate = 150;
        this.interval = 0;
        this.snakes = [];
        this.keys = new Set();

        window.addEventListener("keydown", (event) => {
            this.keys.add(event.key.toLowerCase());
        });

        window.addEventListener("keyup", (event) => {
            this.keys.delete(event.key.toLowerCase());
        });
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

    update(){
    
        console.log("update wordt aangeroepen");
        console.log(this.keys)
        for (const snake of this.snakes) {
            console.log(snake)
            snake.move(this.keys, this);
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