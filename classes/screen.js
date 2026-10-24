class screenClass{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.storage = Array.from({ length: width }, () =>
            Array(height).fill(CELL.FREE)
        );
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
            return CELL.WALL
        }
        return this.storage[x][y]
    }
}