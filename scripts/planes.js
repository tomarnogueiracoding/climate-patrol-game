// PLANE

class Plane {
    constructor(width, height, color, x, y, ctx) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.planeImg = new Image()
        this.planeImg.addEventListener('load', () => {
         });
         this.planeImg.src = '/final-images/plane.png';
    }


    draw() {

        this.ctx.drawImage(this.planeImg, this.x, this.y, this.width, this.height);
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