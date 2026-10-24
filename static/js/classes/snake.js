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
        this.direction = 'o';
        game.screen.setCell(spawnpoints.x, spawnpoints.y, this);
    }

    move(keys, game) {
        if (keys.has("w") && this.direction !== "b") {
            this.direction = "o";
        } else if (keys.has("s") && this.direction !== "o") {
            this.direction = "b";
        } else if (keys.has("a") && this.direction !== "r") {
            this.direction = "l";
        } else if (keys.has("d") && this.direction !== "l") {
            this.direction = "r";
        }

        const head = this.snake[0];
        const newHead = new Vector(head.x, head.y);

        switch (this.direction) {
            case "o":
                newHead.y -= this.speed;
                break;
            case "b":
                newHead.y += this.speed;
                break;
            case "l":
                newHead.x -= this.speed;
                break;
            case "r":
                newHead.x += this.speed;
                break;
            default:
                return;
        }

        // Vanaf hier komt je bestaande botsings- en bewegingscode.


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