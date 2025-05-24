// Get the bird element from the HTML
const bird = document.getElementById('bird');

// Game state variables
let birdTop = 250;        // Bird's vertical position
let birdLeft = 50;        // Bird's horizontal position  
let gravity = 2;          // How fast the bird falls
let gameSpeed = 2;        // How fast pipes move
let isGameOver = false;   // Track if game has ended

// Initialize the game to starting state
function initializeGame(){
    birdTop = 250;
    isGameOver = false;
    bird.style.top = birdTop + "px"; // Set initial bird position
    document.addEventListener("keydown", jump);
}

// Make the bird jump when player presses a key
function jump(){
    if(!isGameOver){
        birdTop -= 50; // Move bird up by 50 pixels
    }
}

// Apply gravity to make the bird fall naturally
function applyGravity(){
    if(!isGameOver){
        birdTop += gravity;               // Increase bird's downward position
        bird.style.top = birdTop + "px";  // Update bird's visual position
    }
}

// Move all pipe obstacles from right to left
function movePipes(){
    const pipes = document.querySelectorAll('.pipe');
    
    pipes.forEach(pipe => {
        let pipeLeft = parseInt(pipe.style.left);
        if(pipeLeft > -60){
            // Move pipe left by gameSpeed pixels
            pipe.style.left = (pipeLeft - gameSpeed) + "px";
        }else{
            // Reset pipe to right side when it goes off screen
            pipe.style.left = "400px";
        }
    })
}

// Check if bird collides with pipes or boundaries
function detectCollision(){
    const pipes = document.querySelectorAll('.pipe');
    
    // Check collision with each pipe
    pipes.forEach(pipe => {
        let pipeLeft = parseInt(pipe.style.left);
        
        // Collision detection using rectangle overlap
        if(
            birdLeft + 40 > pipeLeft &&                                    // Bird's right edge past pipe's left edge
            birdLeft < pipeLeft + 60 &&                                    // Bird's left edge before pipe's right edge  
            birdTop + 40 > parseInt(pipe.style.top) &&                    // Bird's bottom below pipe's top
            birdTop < parseInt(pipe.style.top) + parseInt(pipe.style.height) // Bird's top above pipe's bottom
        ){
            gameOver();
        }
    });
    
    // Check if bird hits top or bottom boundaries
    if(birdTop <= 0 || birdTop >= 560){
        gameOver();
    }
}

// Handle game over scenario
function gameOver(){
    isGameOver = true;
    alert("Game over! Click OK to restart.");
    initializeGame();  // Reset game state
    resetPipes();      // Reset pipe positions
    gameLoop();        // Restart the game loop
}

// Reset all pipes to their starting positions
function resetPipes(){
    const pipes = document.querySelectorAll('.pipe');
    pipes.forEach(pipe => {
        pipe.style.left = "400px";
    });
}

// Main game loop - runs continuously during gameplay
function gameLoop(){
    if(!isGameOver){
        applyGravity();     // Make bird fall
        movePipes();        // Move obstacles
        detectCollision();  // Check for crashes
        requestAnimationFrame(gameLoop); // Schedule next frame
    }
}

// Start the game when page loads
document.addEventListener("DOMContentLoaded", function(){
    initializeGame();
    gameLoop();
})