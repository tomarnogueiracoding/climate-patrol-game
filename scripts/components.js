// Helicopter

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
        this.gravity = 0.05;
        this.gravitySpeed = 0;
    }

    newPos() {
        this.gravitySpeed += this.gravity;
        console.log(this.gravitySpeed)
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        


       
    }

    goingDown() {

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

    crashWith(obstacle) {
        return !(
            this.bottomEdge() < obstacle.topEdge() ||
            this.topEdge() > obstacle.bottomEdge() ||
            this.rightEdge() < obstacle.leftEdge() ||
            this.leftEdge() > obstacle.rightEdge());
    }
}