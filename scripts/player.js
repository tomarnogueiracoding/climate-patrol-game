// HELICOPTER

class Player {
    constructor(width, height, x, y, ctx) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = 1;
        this.gravitySpeed = 0.0005;
        this.playerImg = new Image()
        this.playerImg.addEventListener('load', () => {
    });
    this.playerImg.src =
      './final-images/helicopter.png';
}

    newPos() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        
       
    }

    checkGravitySpeed() {
        if (this.gravitySpeed >2) {
            this.gravitySpeed = 1;
        }

    }

    checkScreenEdges() {
        if (this.y <= 2) {
            this.y = 2
          }
      
          if (this.y + this.height >= 648) {
            this.y = 650 - this.height;
          }
      
          if (this.x <= 2) {
            this.x = 0;
          }
          if (this.x + this.width >= 1198) {
            this.x = 1200 - this.width;
          }
    }

    draw() { 
        this.ctx.drawImage(this.playerImg, this.x, this.y, this.width, this.height);
    }

    leftEdge() {
        return this.x;
    }

    rightEdge() {
        return this.x + this.width;
    }

    topEdge() {
        return this.y;
    }

    bottomEdge() {
        return this.y + this.height;
    }

    crashWithBuildings(buildings) {
        return !(
            this.bottomEdge() < buildings.topEdge() ||
            this.topEdge() > buildings.bottomEdge() ||
            this.rightEdge() < buildings.leftEdge() ||
            this.leftEdge() > buildings.rightEdge());
    }

    crashWithPlanes(planes) {
        return !(
            this.bottomEdge() < planes.topEdge() ||
            this.topEdge() > planes.bottomEdge() ||
            this.rightEdge() < planes.leftEdge() ||
            this.leftEdge() > planes.rightEdge());
    }

    crashWithPeople(people) {
        return !(
            this.bottomEdge() < people.topEdge() ||
            this.topEdge() > people.bottomEdge() ||
            this.rightEdge() < people.leftEdge() ||
            this.leftEdge() > people.rightEdge());
    }

    crashWithSafezone(safezone) {
        return !(
            this.bottomEdge() < safezone.topEdge() ||
            this.topEdge() > safezone.bottomEdge() ||
            this.rightEdge() < safezone.leftEdge() ||
            this.leftEdge() > safezone.rightEdge());
    }
}




