import Screen from "./screen.js";
import Food, { Apple } from "./food.js";
import Vector from "./vector.js";
import CELL from "./cell.js"
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

    spawnfood(x, y){
        const apple = new Apple(5,x, y);
        this.screen.setCell(apple.location.x, apple.location.y, apple);
    }

    update(){
        for (const snake of this.snakes) {
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

    generatefood(){
        let x, y;

        do {
            x = Math.floor(Math.random() * this.screen.width);
            y = Math.floor(Math.random() * this.screen.height);
        } while (this.screen.check(x, y) !== CELL.FREE);

        const food = new Apple(x, y);
        this.screen.setCell(x,y,food);

    }
}