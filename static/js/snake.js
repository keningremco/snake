import Game from "./classes/game.js";
import Screen from "./classes/screen.js"
import Vector from "./classes/vector.js";
import Snake from "./classes/snake.js"

const screen = new Screen(20, 20);
const game = new Game(screen);

console.log(game.screen.isInside(1,1))