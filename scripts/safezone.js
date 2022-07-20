// SAFEZONE

class Safezone {
    constructor(width, height, x, y, ctx) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.safezoneImg = new Image()
        this.safezoneImg.addEventListener('load', () => {
         });
         this.safezoneImg.src = './final-images/safezone.png';
    }

    

    draw() {

        this.ctx.drawImage(this.safezoneImg, this.x, this.y, this.width, this.height);
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