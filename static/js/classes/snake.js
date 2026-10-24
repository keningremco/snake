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
        const head = this.snake[0];
        const newHead = new Vector(head.x, head.y);

        if (keys.has("w")) newHead.y -= this.speed;
        else if (keys.has("s")) newHead.y += this.speed;
        else if (keys.has("a")) newHead.x -= this.speed;
        else if (keys.has("d")) newHead.x += this.speed;
        else return;

        // Controleer het doelvakje
        const target = game.screen.check(newHead.x, newHead.y);

        if (target === CELL.WALL || target instanceof Snake) {
            this.die(game);
            return;
        }

        const eating = target instanceof Food;

        if (target !== CELL.FREE && !eating) return;

        // Voeg de nieuwe kop toe
        this.snake.unshift(newHead);
        game.screen.setCell(newHead.x, newHead.y, this);

        // Verwijder de staart alleen als er niet gegeten wordt
        if (!eating) {
            const tail = this.snake.pop();
            game.screen.clearCell(tail.x, tail.y);
        } else {
            this.eat(target, game);
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