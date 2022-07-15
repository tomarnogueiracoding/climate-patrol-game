class Game {
    constructor(ctx, width, height, player) {
        this.frames = 0;
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.player = player;
        //this.building = building;
        //this.plane = plane;
        //this.people = people;
        //this.safeZone = safeZone;
        this.interval = null;
        this.isRunning = false
    }

    start() {
        this.interval = setInterval(this.updateGameArea, 1000 / 60);
        this.isRunning = true;
    }

    reset = () => {
        this.player.x = 0;
        this.player.y = 0;
        this.frames = 0;
        //this.building = [];
        //this.plane = [];
        //this.people = [];
        //this.safeZone.x = 0;
        //this.safeZone.y = 0;
        this.start();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    stop() {
        clearInterval(this.interval);
        this.isRunning = false;
    }

    updateBuilding() {

    }

    updatePlane() {

    }

    updatePeople() {

    }

    updateSafeZone() {

    }

    checkGameOver() {

    }

    score() {

    }

    updateGameArea = () => {
        this.clear();
        //this.checkGameOver();
        //this.updateBuilding();
        //this.updatePlane();
        //this.updatePeople();
        //this.updateSafeZone();
        this.player.newPos();
        this.player.draw();
        //this.score();
    }
}