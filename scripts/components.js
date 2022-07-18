// HELICOPTER

class Player {
    constructor(width, height, color, x, y, ctx) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = 1;
        this.gravitySpeed = 0.0005;
    }

    newPos() {
        this.gravitySpeed += this.gravity;
        console.log(this.gravitySpeed)
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
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
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

    crashWith(buildings) {
        return !(
            this.bottomEdge() < buildings.topEdge() ||
            this.topEdge() > buildings.bottomEdge() ||
            this.rightEdge() < buildings.leftEdge() ||
            this.leftEdge() > buildings.rightEdge());
    }
}

// BUILDINGS

class Building {
    constructor(width, height, color, x, y, ctx) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y - this.height;
        this.ctx = ctx;
    }

    

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
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
}

// PLANES

class PLane {
    constructor(width, height, color, x, y, ctx) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this y = Math.floor(Math.random(y));
        this.ctx = ctx;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
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
}