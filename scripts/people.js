// PEOPLE

class People {
    constructor(width, height, x, y, ctx) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.peopleImg = new Image()
        this.peopleImg.addEventListener('load', () => {
         });
         this.peopleImg.src = '/final-images/people.png';
    }

    

    draw() {

        this.ctx.drawImage(this.peopleImg, this.x, this.y, this.width, this.height);
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