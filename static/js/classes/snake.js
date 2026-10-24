import CELL from "./cell.js";
import Food from "./food.js";
import Vector from "./vector.js";

export default class Snake{
    constructor(username, spawnpoints, icon, game) {
        this.username = username;
        this.snake = [];
        this.speed = 1;
        this.icon = icon;
        this.snake.push(new Vector(spawnpoints.x, spawnpoints.y));
        game.screen.setCell(spawnpoints.x, spawnpoints.y, this);
    }

    move(keys, game) {
        console.log(keys)
        const head = this.snake[0];
        const newHead = new Vector(head.x, head.y);

        if (keys.has("w")) newHead.y -= this.speed;
        if (keys.has("s")) newHead.y += this.speed;
        if (keys.has("a")) newHead.x -= this.speed;
        if (keys.has("d")) newHead.x += this.speed;

        const target = game.screen.check(newHead.x, newHead.y);

        if (target === CELL.WALL || target instanceof Snake) {
            this.die(game);
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
            game.screen.clearCell(part.x, part.y);
            const food = new Food(5)
            game.screen.setCell(part.x, part.y, food)
        }
    }
    eat(target){};
}