function animation(playerX, playerY) {

    let img = new Image();
    
    img.src="./final-images/explosion.png";
    img.onload = () => {
        init();
    };
    const scale = 0.2;
    const width = 400;
    const height = 400;
    const scaledWidth = scale * width;
    const scaledHeight = scale * height;
    let intervalId = null;
    
    function drawFrame(frameX, frameY, canvasX, canvasY) {
        ctx.drawImage(img,frameX * width, frameY * height, width, height,canvasX, canvasY, scaledWidth, scaledHeight);
    }
    
    const cycleLoop = [0, 1, 0, 2];
    let currentLoopIndex = 0;
    let frameCount = 0;
    let currentDirection = 0;
    
    function step() {
        frameCount++;
        if (frameCount > 60) {
          frameCount = 0;
          clearInterval(intervalId)
        } 
 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFrame(cycleLoop[currentLoopIndex], currentDirection, playerX, playerY);
        currentLoopIndex++;
        if (currentLoopIndex >= cycleLoop.length) {
          currentLoopIndex = 0;
          currentDirection++; // Next row/direction in the sprite sheet
        }
        // Reset to the "down" direction once we've run through them all
        if (currentDirection >= 4) {
          currentDirection = 0;
        }
      }
    
      function init() {
        intervalId = setInterval(step, 20)
      }
    

    }
    
