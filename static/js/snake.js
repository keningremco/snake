import Game from "./classes/game.js";
import Screen from "./classes/screen.js"
import Vector from "./classes/vector.js";
import Snake from "./classes/snake.js"


const game = new Game(Screen);

console.log(game.screen.isInside(1,1))