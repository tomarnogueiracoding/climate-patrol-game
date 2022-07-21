const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const cWidth = canvas.width;
const cHeight = canvas.height;

// Creates the Background


// Creates the Player



// Creates the game

// Creates the Start Button
const player = new Player(75, 35, 0, 0, ctx);

//Create bg image
let bgImg = new Image()
  bgImg.addEventListener('load', () => {
        ctx.drawImage(bgImg, 0, 0, cWidth, cHeight)
         });
        bgImg.src = './final-images/start-menu.jpg';

let game;

let gameOverScreen = false;

document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'Space':
            if(!game) {
                game = new Game(ctx, cWidth, cHeight, player);
                game.start();
            }else if(game &&  !game.isRunning && !gameOverScreen){
                game.reset()
            } else if(game && !game.isRunning){
                ctx.drawImage(bgImg, 0, 0, cWidth, cHeight)
                gameOverScreen = false;
            } 
            if (!(player.y <= 8)) {
                player.speedY -= 4;
              }
            break;
        case 'ArrowLeft':
            if (!(player.x <= 4)) {
                player.speedX -= 2;
              }
            break;
        case 'ArrowRight':
            if (!(player.x + player.width >= cWidth - 4)) {
                player.speedX += 2;
              }
            break;
    }
})

document.addEventListener('keyup', (e) => {
    player.speedX = 0;
    player.speedY = 0;
})

