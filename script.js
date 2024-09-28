const bird = document.getElementById('bird');
let birdTop = 250;
let birdLeft = 50;
let gravity = 2;
let gameSpeed = 2;
let isGameOver = false;

//initialize the game
function initializeGame(){
    birdTop = 250;
    isGameOver = false;
    document.addEventListener("keydown", jump);
}

//jump the bird
function jump(){
    if(!isGameOver){
        birdTop -= 50;
    }
}

//apply the gravity
function applyGravity(){
    if(!isGameOver){
        birdTop += gravity;
        bird.style.top = birdTop + "px";
    }
}

//move the obstacles/pipes
function movePipes(){
    const pipes = document.querySelectorAll('.pipe');
    
    pipes.forEach(pipe => {
        let pipeLeft = parseInt(pipe.style.left);
        if(pipeLeft > -60){
            pipe.style.left = (pipeLeft - gameSpeed) + "px";
        }else{
            pipe.style.left = "400px";
        }
    })
}

//detect the collision
function detectCollision(){
    const pipes = document.querySelectorAll('.pipe');
    pipes.forEach(pipe => {
        let pipeLeft = parseInt(pipe.style.left);
        if(
            birdLeft + 40 > pipeLeft &&
            birdLeft < pipeLeft + 60 &&
            birdTop + 40 > parseInt(pipe.style.top) &&
            birdTop < parseInt(pipe.style.top) + parseInt(pipe.style.height)
        ){
            gameOver();
        }
    });
    if(birdTop <= 0 || birdTop >= 560){
        gameOver();
    }
}

//gameOver
function gameOver(){
    isGameOver = true;
    alert("Game over! Click OK to restart.")
    initializeGame();
    resetPipes();
}

//reset pipes
function resetPipes(){
    const pipes = document.querySelectorAll('.pipe');
    pipes.forEach(pipe => {
        pipe.style.left = "400px";
    });
}

//game loop
function gameLoop(){
    if(!isGameOver){
        applyGravity();
        movePipes();
        detectCollision();
        requestAnimationFrame(gameLoop);
    }
}

document.addEventListener("DOMContentLoaded", function(){
    initializeGame();
    gameLoop();
})