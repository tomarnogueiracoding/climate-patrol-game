// BUILDINGS

class Building {
    constructor(width, height, x, y, ctx) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y - this.height;
        this.ctx = ctx;
        this.buildingImg = new Image()
        this.buildingImg.addEventListener('load', () => {
         });
         this.buildingImg.src = '/final-images/building.png';

    }

    

    draw() {

        this.ctx.drawImage(this.buildingImg, this.x, this.y, this.width, this.height);
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