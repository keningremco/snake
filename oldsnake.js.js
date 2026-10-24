const field = document.getElementById('grid');

class screenClass{
    constructor(width, height){
        this.width = width;
        this.height = height;
    }
}

let screen = new screenClass(10, 10);

console.log("snake.js is geladen!");
function makeField(x, y){
    for (const row in x){
        let columns = "";
        for (const column in y){
            columns += '<div>vak</div>';
        };
        field.innerHTML += '<div>' + columns + '</div>';
    };
    
};

makeField(screen.width, screen.height);

class vector {
    constructor(x, y){
        this.x = x;
        this.y= y;
    }
}

const width = 5;
const height =5;

let grid = [];

for (let x = 0; x < width; x++) {
    grid[x] = [];

    for (let y = 0; y < height; y++) {
        grid[x][y] = " ";
    }
}

function makeGrid(){
    grid = [];
    
    for (let x = 0; x < width; x++) {
        grid[x] = [];

        for (let y = 0; y < height; y++) {
            grid[x][y] = " ";
        }
    }
}

function claim(color, part, location){
    grid[location.x][location.y] = color;
}

function check(vector){
    return grid[vector.x][vector.y];
};

class snake{
    constructor(username, spawnpoints, icon) {
        this.username = username;
        this.snake = [];
        this.speed = 1;
        this.icon = icon;
        this.snake.push(new vector(spawnpoints.x, spawnpoints.y));
    }

    move(keys){
        let teal = this.snake[this.snake.length - 1]
        const head = this.snake[0]
        let new_head = new vector(head.x, head.y);
        if (keys.includes("w")){
            new_head.y += this.speed;
        };
        if (keys.includes("s")){
            new_head.y -= this.speed;
        };
        if (keys.includes("a")){
            new_head.x -= this.speed;
        };
        if (keys.includes("d")){
            new_head.x += this.speed;
        };

        this.snake.unshift(new_head);
        this.snake.pop()
    }
    drawSnake() {
        
        for (let i = 0; i < this.snake.length; i++) {
            if (i === 0) {
                claim(this.icon, "head", this.snake[i]);
            } else {
                claim(this.icon, "body", this.snake[i]);
            }
        }
        
    }
}



let snake1 = new snake('test', new vector(0,0), 'x');
let snake2 = new snake('hoi', new vector(4,4), 'z');
let keys = ['', 'w', 'w', 'w', 'd', 'd', 'd', 'w', 'd'];


for (const key of keys) {
    makeGrid();
    snake1.move([key]);
    snake1.drawSnake();
    snake2.drawSnake();
    console.log(grid)
}