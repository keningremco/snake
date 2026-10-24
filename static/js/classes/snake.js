import CELL from "./cell.js";
import Food from "./food.js";
import Snake from "./snake.js";
import Vector from "./vector.js";

export default class Snake{
    constructor(username, spawnpoints, icon) {
        this.username = username;
        this.snake = [];
        this.speed = 1;
        this.icon = icon;
        this.snake.push(new Vector(spawnpoints.x, spawnpoints.y));
    }

    move(keys, game) {
        const head = this.snake[0];
        const newHead = new Vector(head.x, head.y);

        if (keys.includes("w")) newHead.y -= this.speed;
        if (keys.includes("s")) newHead.y += this.speed;
        if (keys.includes("a")) newHead.x -= this.speed;
        if (keys.includes("d")) newHead.x += this.speed;

        const target = game.screen.check(newHead.x, newHead.y);

        if (target === CELL.WALL || target instanceof Snake) {
            this.die();
            return;
        }

        if (target instanceof Food) {
            this.eat(target);
        } else if (target !== CELL.FREE) {
            return;
        }

        this.snake.unshift(newHead);

        if (!(target instanceof Food)) {
            this.snake.pop();
        }
    }
    die(game){
        for (const part of this.snake){
            game.screen.clearCell(this.snake.x, this.snake.y);
            const food = new Food(5)
            game.screen.setCell(this.snake.x, this.snake.y, food)
        }
    }
}