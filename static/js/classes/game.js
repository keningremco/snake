export default class Game{
    constructor(Screen){
        this.screen = new Screen(20, 20);
        this.running = true;
    }
}