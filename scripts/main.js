const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const cWidth = canvas.width;
const cHeight = canvas.height;

// Creates the Player
const player = new Player(75, 35, 'orange', 350, 300, ctx)



// Creates the game
let game;

// Creates the Start Button
const startBtn = document.getElementById('start');
startBtn.addEventListener('click', (e) => {
    if (!game) {
        game = new Game(ctx, cWidth, cHeight, player);
        game.start();
    } else if (game && !game.isRunning) {
        game.reset();
    }
})

document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'Space':
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