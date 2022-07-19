class Game {
    constructor(ctx, width, height, player) {
        this.frames = 0;
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.player = player;
        this.interval = null;
        this.isRunning = false
        this.buildings = [];
        this.planes = [];
        this.peoples = [];
        this.peopleInHelicopter = 0;
        this.peopleSaved = 0;   
        this.lives = 3;
        this.safezone = null;
    }

    // Starting the game

    start = () => {
        this.interval = setInterval(this.updateGameArea, 20);
        this.isRunning = true;
        this.createBuildings();
        this.createPlanes();
        this.createPeople();   
        this.createSafezone();
       
    }

    // Reseting the game

    reset = () => {
        this.player.x = 0;
        this.player.y = 0;
        this.frames = 0;
        this.buildings = [];
        this.planes = [];
        this.peoples = [];
        this.peopleInHelicopter = 0;
        this.start();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    // Creates the buildings

    createBuildings(){
        const building1 = new Building(240, 400, '#A600FF', 0, this.height, this.ctx)
        const building2 = new Building(240, 300, '#FF00D1', 240, this.height, this.ctx)
        const building3 = new Building(240, 150, '#A600FF', 480, this.height, this.ctx)
        const building4 = new Building(240, 450, '#FF00D1', 720, this.height, this.ctx)
        const building5 = new Building(240, 80, '#A600FF', 960, this.height, this.ctx)
        this.buildings.push(building1, building2, building3, building4, building5)
       
    }

    // Creates the planes
    
    createPlanes(){
        const plane1 = new Plane(132, 38, 'red', 500, 300, this.ctx)
        this.planes.push(plane1)

        for (let i = 0; i < this.planes.length; i++) {
            this.planes[i].x -= 1;
            this.planes[i].draw();
          }
      
          this.frames += 1;

          
    }

    // Creates people

    createPeople(){
        const people1 = new People(18, 34, 'black', this.buildings[1].x + this.buildings[1].x / 2, this.buildings[1].y - 34, this.ctx)
        const people2 = new People(18, 34, 'black', this.buildings[2].x + this.buildings[1].x / 2, this.buildings[2].y - 34, this.ctx)
        const people3 = new People(18, 34, 'black', this.buildings[3].x + this.buildings[1].x / 2, this.buildings[3].y - 34, this.ctx)
        const people4 = new People(18, 34, 'black', this.buildings[4].x + this.buildings[1].x / 2, this.buildings[4].y - 34, this.ctx)
        this.peoples.push(people1, people2, people3, people4);
    }

    // Creates the Safe Area

    createSafezone() {
       this.safezone = new Safezone(74, 101, 'green', this.buildings[0].x + this.buildings[0].width / 5, this.buildings[0].y - 101, this.ctx)
    }

    // Design the background

    background() {
        this.ctx.fillStyle = 'cyan';
        this.ctx.fillRect(0, 0, this.width, this.height); 
    }

    // Stopping the game

    stop() {
        clearInterval(this.interval);
        this.isRunning = false;
    }

    // Game over checks - colisions and scoring conditions

    checkGameOver = () => {
        const crashedBuildings = this.buildings.some((buildings) => {
            return this.player.crashWithBuildings(buildings);
          });

        const crashedPlanes = this.planes.some((planes) => {
            return this.player.crashWithPlanes(planes);
          });
      
          if (crashedBuildings) {
            this.stop();
            this.lives--
          } else if (crashedPlanes) {
            this.stop();
            this.lives--
          } else if (this.lives === 0) {
            this.stop();
          }
    }

    // Keepint track of people inside helicopter or delivered to safezone

    checkPeopleColision = () => {
        const crashedPeople = this.peoples.some((people, index) => {
            if (this.player.crashWithPeople(people) && (this.peopleInHelicopter < 1)) {
                this.peoples.splice(index, 1)
                this.peopleInHelicopter++
            }
        })

    }

    checkSafezoneColision = () => {
            const crashedSafezone = this.safezone
            if (this.player.crashWithSafezone(this.safezone) && (this.peopleInHelicopter > 0)) {
            this.peopleInHelicopter--
            this.peopleSaved++
        }
    }


    // Draws the score on the screen - People in Helicopter and people saved
    score() {
        this.ctx.font = '24px sans-serif';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`People in Helicopter: ${this.peopleInHelicopter}`, 950, 30);
        this.ctx.fillText(`People Saved: ${this.peopleSaved}`, 950, 60);
        this.ctx.fillText(`Lives: ${this.lives}`, 950, 90);
    }

    // Updates the canvas 

    updateGameArea = () => {

        this.clear();
        this.background()
        this.buildings.forEach((building) => {
            building.draw();
        })

        this.planes.forEach((plane) => {
            plane.draw();
        })
        
        this.peoples.forEach((people) => {
            people.draw();
        })
        this.player.checkGravitySpeed();
        this.player.checkScreenEdges();
        this.player.newPos();
        this.player.draw();
        this.checkGameOver();
        this.checkPeopleColision();
        this.safezone.draw()
        this.checkSafezoneColision();
        this.score();
    }
}