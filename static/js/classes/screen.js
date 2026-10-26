import CELL from "./cell.js";
import Food from "./food.js";
import Snake from "./snake.js";
export default class Screen{
    constructor(width, height, element){
        this.width = width;
        this.height = height;
        this.storage = Array.from({ length: width }, () =>
            Array(height).fill(CELL.FREE)
        );
        this.element = element;
    }
    isInside(x,y){
        if (x >= this.width || x < 0){
            return false
        }
        if (y >= this.height || y < 0){
            return false
        }
        return true
    }
    check(x, y){
        if (!this.isInside(x, y)){
            return CELL.WALL;
        }
        return this.storage[x][y];
    }

    setCell(x, y, value){
        if (!this.isInside(x, y)) return false;

        this.storage[x][y] = value;
        return true
    }

    clearCell(x, y) {
        if (!this.isInside(x, y)) return false;

        this.storage[x][y] = CELL.FREE;
        return true;
    }

    draw(){
        this.element.innerHTML = "";
        for (let y = 0; y < this.height; y++) {
            const row = document.createElement('div')
            row.classList.add("row");
            for (let x = 0; x < this.width; x++) {
                const cell = document.createElement("div");

                cell.classList.add("cell");

                const value = this.storage[x][y];

                if (value instanceof Food) {
                    cell.classList.add("food");
                } else if (value instanceof Snake) {
                    cell.classList.add("snake");
                } else if (value === CELL.WALL) {
                    cell.classList.add("wall");
                } else if (value instanceof Food){
                    cell.classList.add("food");
                }

                row.appendChild(cell);
            }
            this.element.appendChild(row)
        }
    }
}