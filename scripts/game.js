class Game {
    constructor(ctx, width, height, player) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.player = player;
        //this.plane = plane;
        //this.people = people;
        //this.safeZone = safeZone;
        this.interval = null;
        this.isRunning = false
        this.buildings = [];
        this.planes = [];
    }

    start = () => {
        this.interval = setInterval(this.updateGameArea, 20);
        this.isRunning = true;
        this.createBuildings()
        //this.createPlanes()
    }

    reset = () => {
        this.player.x = 0;
        this.player.y = 0;
        this.buildings = [];
        this.planes = [];
        //this.plane = [];
        //this.safeZone.x = 0;
        //this.safeZone.y = 0;
        this.start();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    createBuildings(){
        const building1 = new Building(240, 400, '#A600FF', 0, this.height, this.ctx)
        const building2 = new Building(240, 300, '#FF00D1', 240, this.height, this.ctx)
        const building3 = new Building(240, 150, '#A600FF', 480, this.height, this.ctx)
        const building4 = new Building(240, 450, '#FF00D1', 720, this.height, this.ctx)
        const building5 = new Building(240, 80, '#A600FF', 960, this.height, this.ctx)
        this.buildings.push(building1, building2, building3, building4, building5)
       
    }

    createPlanes(){
        const plane = new Plane(width, height, color, x, y, ctx)
    }


    /* createPlanes() {

    } */


    stop() {
        clearInterval(this.interval);
        this.isRunning = false;
    }


    checkGameOver = () => {
        const crashed = this.buildings.some((buildings) => {
            return this.player.crashWith(buildings);
          });
      
          if (crashed) {
            this.stop();
          }
    }

    score() {

    }

    updateGameArea = () => {

        this.clear();
        this.buildings.forEach((building) => {
            building.draw()
        })

       /*  this.planes.forEach((plane) =>) {
            plane.draw()
        } */
        //this.updatePlane();
        //this.updatePeople();
        //this.updateSafeZone();
        
        this.player.checkGravitySpeed();
        this.player.checkScreenEdges();
        this.player.newPos();
        this.player.draw();
        this.checkGameOver();
        //this.score();
    }
}