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
        this.peoples = [];
    }

    start = () => {
        this.interval = setInterval(this.updateGameArea, 20);
        this.isRunning = true;
        this.createBuildings();
        this.createPlanes();
        this.createPeople();
        this.drawBackground(0, 0, 1200, 650);
       
    }

    reset = () => {
        this.player.x = 0;
        this.player.y = 0;
        this.buildings = [];
        this.planes = [];
        this.peoples = [];
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
        const plane1 = new Plane(132, 38, 'red', 500, 300, this.ctx)
        this.planes.push(plane1)
    }

    createPeople(){
        const people1 = new People(18, 34, 'black', this.buildings[1].x + this.buildings[1].x / 2, this.buildings[1].y - 34, this.ctx)
        const people2 = new People(18, 34, 'black', this.buildings[2].x + this.buildings[1].x / 2, this.buildings[2].y - 34, this.ctx)
        const people3 = new People(18, 34, 'black', this.buildings[3].x + this.buildings[1].x / 2, this.buildings[3].y - 34, this.ctx)
        const people4 = new People(18, 34, 'black', this.buildings[4].x + this.buildings[1].x / 2, this.buildings[4].y - 34, this.ctx)
        this.peoples.push(people1, people2, people3, people4);
    }


    stop() {
        clearInterval(this.interval);
        this.isRunning = false;
    }


    checkGameOver = () => {
        const crashedBuildings = this.buildings.some((buildings) => {
            return this.player.crashWithBuildings(buildings);
          });

        const crashedPlanes = this.planes.some((planes) => {
            return this.player.crashWithPlanes(planes);
          });
      
          if (crashedBuildings) {
            this.stop();
          } else if (crashedPlanes) {
            this.stop();
          }
    }

    checkPeopleColision = () => {
        const crashedPeople = this.peoples.some((people) => {
            return this.player.crashWithPeople(people);
        })

        if (crashedPeople) {
            this.peoples.shift();
        }
    }

    drawBackground() {
        this.ctx.fillStyle = 'cyan';
        this.ctx.fillRect(this.x, this.y, this.cWidth, this.Height)
    }

    score() {

    }

    updateGameArea = () => {

        this.clear();
        this.buildings.forEach((building) => {
            building.draw();
        })

        this.planes.forEach((plane) => {
            plane.draw();
        })
        
        this.peoples.forEach((people) => {
            people.draw();
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
        this.checkPeopleColision();
        //this.score();
    }
}