// PEOPLE

class People {
    constructor(width, height, color, x, y, ctx) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
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