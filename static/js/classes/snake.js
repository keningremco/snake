
import CELL from "./cell.js";
import Food from "./food.js";
import Vector from "./vector.js";

const DIRECTION = {
    NONE: "left",
    UP: "up",
    DOWN: "down",
    LEFT: "left",
    RIGHT: "right"
};

export default class Snake {
    constructor(username, spawnpoints, icon, game) {
        this.username = username;
        this.snake = [];
        this.speed = 1;
        this.icon = icon;
        this.direction = DIRECTION.NONE;

        this.snake.push(new Vector(spawnpoints.x, spawnpoints.y));
        game.screen.setCell(spawnpoints.x, spawnpoints.y, this);
    }

    move(keys, game) {
        // Verander de richting op basis van de ingedrukte toets.
        // Voorkom dat de slang direct omkeert.
        if (keys.has("w") && this.direction !== DIRECTION.DOWN) {
            this.direction = DIRECTION.UP;
        } else if (keys.has("s") && this.direction !== DIRECTION.UP) {
            this.direction = DIRECTION.DOWN;
        } else if (keys.has("a") && this.direction !== DIRECTION.RIGHT) {
            this.direction = DIRECTION.LEFT;
        } else if (keys.has("d") && this.direction !== DIRECTION.LEFT) {
            this.direction = DIRECTION.RIGHT;
        }

        const head = this.snake[0];
        const newHead = new Vector(head.x, head.y);

        switch (this.direction) {
            case DIRECTION.UP:
                newHead.y -= this.speed;
                break;
            case DIRECTION.DOWN:
                newHead.y += this.speed;
                break;
            case DIRECTION.LEFT:
                newHead.x -= this.speed;
                break;
            case DIRECTION.RIGHT:
                newHead.x += this.speed;
                break;
            case DIRECTION.NONE:
                return;
        }

        const target = game.screen.check(newHead.x, newHead.y);

        if (target === CELL.WALL || target instanceof Snake) {
            this.die(game);
            return;
        }

        const eating = target instanceof Food;

        if (target !== CELL.FREE && !eating) return;

        this.snake.unshift(newHead);
        game.screen.setCell(newHead.x, newHead.y, this);

        if (!eating) {
            const tail = this.snake.pop();
            game.screen.clearCell(tail.x, tail.y);
            // Zet de slang terug op de nieuwe kop als nodig.
            game.screen.setCell(newHead.x, newHead.y, this);
        } else {
            this.eat(target, game);
        }
    }

    die(game) {
        for (const part of this.snake) {
            game.screen.clearCell(part.x, part.y);
            game.screen.setCell(part.x, part.y, new Food(5));
        }

        this.snake = [];
        game.removeSnake(this);
    }

    eat(target, game) {
        // Voeg hier je eetlogica toe.
    }
}

export { DIRECTION };
