import Game from "./classes/game.js";
import Screen from "./classes/screen.js";
import Vector from "./classes/vector.js";
import Snake from "./classes/snake.js"

const grid = document.getElementById('grid')

const game = new Game(20, 20, grid);

const snake1 = new Snake('test', new Vector(1,1), 'x', game)

game.screen.draw()