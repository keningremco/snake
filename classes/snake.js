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