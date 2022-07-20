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
        // ----- IMAGES -----
        // Background Image
        this.backgroundImg = new Image()
        this.backgroundImg.addEventListener('load', () => {
         });
        this.backgroundImg.src = './final-images/background.jpg';

        // Fire Overlay Image
        this.fireImg = new Image()
        this.fireImg.addEventListener('load', () => {
         });
        this.fireImg.src = './final-images/fire.png';

        // Game Over Screen
        this.gameOverImg = new Image()
        this.gameOverImg.addEventListener('load', () => {
         });
        this.gameOverImg.src = './final-images/game-over.jpg';

        // Game Win Screen
        this.gameWinImg = new Image()
        this.gameWinImg.addEventListener('load', () => {
         });
        this.gameWinImg.src = './final-images/win-game.jpg';

        // ------- SOUNDS ------
        this.pickUpSound = new Audio('./sounds/people-in-helicopter.mp3');
        this.deliveredSound = new Audio('./sounds/people-delivered.mp3');
        this.backgroundSound = new Audio('./sounds/background-sound.mp3');
        this.jetSound = new Audio('./sounds/jet-sound.mp3');
        this.explosionSound = new Audio('./sounds/explosion.mp3')
    }

    // Starting the game

    start = () => {
        this.planes.push(new Plane(132, 38, this.width, Math.floor(Math.random(this.height)), this.ctx));
        this.interval = setInterval(this.updateGameArea, 20);
        this.isRunning = true;
        this.createBuildings();
        this.createPeople();   
        this.createSafezone();
        this.backgroundSound.play();
        this.backgroundSound.loop = true;
    }

    // Reseting the game

    reset = () => {
        this.player.x = 50;
        this.player.y = 50;
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
        const building1 = new Building(240, 400, 0, this.height, this.ctx)
        const building2 = new Building(240, 300, 240, this.height, this.ctx)
        const building3 = new Building(240, 150, 480, this.height, this.ctx)
        const building4 = new Building(240, 450, 720, this.height, this.ctx)
        const building5 = new Building(240, 80, 960, this.height, this.ctx)
        this.buildings.push(building1, building2, building3, building4, building5)
       
    }

    // Creates the planes
    
    createPlanes = () => {
        if(this.planes.length === 1) {
            return;
        } else {
            this.planes.push(new Plane(132, 38, this.width, Math.floor(Math.random(this.height) * this.height + 50), this.ctx));
            this.jetSound.play();
        }

        
 }

    // Creates people

    createPeople(){
        const people1 = new People(74, 34, this.buildings[1].x + this.buildings[1].x / 2, this.buildings[1].y - 34, this.ctx)
        const people2 = new People(74, 34, this.buildings[2].x + this.buildings[1].x / 2, this.buildings[2].y - 34, this.ctx)
        const people3 = new People(74, 34, this.buildings[3].x + this.buildings[1].x / 2, this.buildings[3].y - 34, this.ctx)
        const people4 = new People(74, 34, this.buildings[4].x + this.buildings[1].x / 2, this.buildings[4].y - 34, this.ctx)
        this.peoples.push(people1, people2, people3, people4);
    }

    // Creates the Safe Area

    createSafezone() {
       this.safezone = new Safezone(74, 101, this.buildings[0].x + 120, this.buildings[0].y - 101, this.ctx)
    }

    // Design the background

    background() {

        this.ctx.drawImage(this.backgroundImg, 0, 0, 1200, 650);
    }

    drawGameOver() {
        this.ctx.drawImage(this.gameOverImg, 0, 0, 1200, 650);

    }

    drawGameWin() {
        this.ctx.drawImage(this.gameWinImg, 0, 0, 1200, 650);
    }

    drawFire() {

        this.ctx.drawImage(this.fireImg, 0, 0, 1200, 650);
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
            this.explosionSound.play();
          } else if (crashedPlanes) {
            this.stop();
            this.lives--
            this.explosionSound.play();
          } else if (this.lives === 0) {
              this.stop()
              this.drawGameOver();
          } else if (this.peopleSaved === 2) {
            this.stop();
            this.drawGameWin();
          }
    }

    // Keepint track of people inside helicopter or delivered to safezone

    checkPeopleColision = () => {
        const crashedPeople = this.peoples.some((people, index) => {
            if (this.player.crashWithPeople(people) && (this.peopleInHelicopter < 1)) {
                this.peoples.splice(index, 1)
                this.peopleInHelicopter++
                this.pickUpSound.play();
            }
        })

    }

    checkSafezoneColision = () => {
            const crashedSafezone = this.safezone
            if (this.player.crashWithSafezone(this.safezone) && (this.peopleInHelicopter > 0)) {
            this.peopleInHelicopter--
            this.peopleSaved++
            this.deliveredSound.play();
        }
    }


    // Draws the score on the screen - People in Helicopter and people saved
    score() {
        this.ctx.font = '35px sans-serif';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`${this.lives}`, 730, 60);
        this.ctx.fillText(`${this.peopleInHelicopter}`, 935, 60);
        this.ctx.fillText(`${this.peopleSaved}`, 1110, 60);
    }

    

    // Updates the canvas   

    updateGameArea = () => {
        this.clear();
        this.background();
        this.safezone.draw();
        this.player.draw();
        this.player.checkGravitySpeed();
        this.player.checkScreenEdges();
        this.player.newPos();
        this.buildings.forEach((building) => {
            building.draw();
        })
        this.planes.forEach((plane) => {
            plane.draw();
            if (plane.x + plane.width < 0) {
             this.planes = [];
        }
            plane.x -= 10
        })
        
        this.peoples.forEach((people) => {
            people.draw();
        })
        
        this.checkGameOver();
        this.checkPeopleColision();
        this.checkSafezoneColision();
        this.score();
        this.drawFire();
        this.createPlanes()
    }
}