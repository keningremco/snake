const field = document.getElementById('grid');



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



const width = 5;
const height =5;

let grid = [];

for (let x = 0; x < width; x++) {
    grid[x] = [];

    for (let y = 0; y < height; y++) {
        grid[x][y] = " ";
    }
}



function claim(color, part, location){
    grid[location.x][location.y] = color;
}

function check(vector){
    return grid[vector.x][vector.y];
};





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