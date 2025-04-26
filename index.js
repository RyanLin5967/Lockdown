const playButton = document.getElementById('playbtn');
const mainpage = document.getElementById('mainpage');

var myGamePiece;
var greySquares = [];
var score = 0; 

function toGame(){
    startGame();
}

function startGame() {
    myGameArea.start();
    myGamePiece = new component(75, 75, "guy.png", 100, 120, "image"); 
    
    for (let i = 0; i < 5; i++) {
        spawnGreySquare();
    }
    
    randomSpawner();
}


var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', keyDownHandler);
        window.addEventListener('keyup', keyUpHandler);
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

function component(width, height, color, x, y, type) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.type = type;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;    

    if (this.type === "image") {
        this.image = new Image();
        this.image.src = color; // color will actually be the image URL
    }

    this.update = function() {
        let ctx = myGameArea.context;
        if (this.type === "image") {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    this.crashWith = function(other) {
        return !(this.x + this.width < other.x ||
                 this.x > other.x + other.width ||
                 this.y + this.height < other.y ||
                 this.y > other.y + other.height);
    }
}


function spawnGreySquare() {
    let tries = 0;
    let maxTries = 50;
    let newSquare;
    let overlap;

    do {
        let randomX = Math.floor(Math.random() * (myGameArea.canvas.width - 30));
        let randomY = Math.floor(Math.random() * (myGameArea.canvas.height - 30));
        newSquare = new component(50, 50, "toiletpaper.webp", randomX, randomY, "image"); 

        // Check overlap
        overlap = greySquares.some(square => {
            return !(newSquare.x + newSquare.width < square.x ||
                     newSquare.x > square.x + square.width ||
                     newSquare.y + newSquare.height < square.y ||
                     newSquare.y > square.y + square.height);
        });

        tries++;
    } while (overlap && tries < maxTries);

    if (!overlap) {
        greySquares.push(newSquare);
    }
}


function randomSpawner() {
    let randomDelay = Math.random() * 3000 + 1000; // 1s-4s
    setTimeout(() => {
        spawnGreySquare();
        randomSpawner();
    }, randomDelay);
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();

    for (let i = 0; i < greySquares.length; i++) {
        greySquares[i].update();
    }

    for (let i = greySquares.length - 1; i >= 0; i--) {
        if (myGamePiece.crashWith(greySquares[i])) {
            greySquares.splice(i, 1); 
            score += 1; 
        }
    }

    drawScore();
}

function drawScore() {
    let ctx = myGameArea.context;
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "right";
    ctx.fillText("Toilet Paper Collected: " + score, myGameArea.canvas.width - 50, 30);
}

function keyDownHandler(e) {
    if (e.key === "ArrowUp") {
        myGamePiece.speedY = -4;
    }
    if (e.key === "ArrowDown") {
        myGamePiece.speedY = 4;
    }
    if (e.key === "ArrowLeft") {
        myGamePiece.speedX = -4;
    }
    if (e.key === "ArrowRight") {
        myGamePiece.speedX = 4;
    }
}

function keyUpHandler(e) {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        myGamePiece.speedY = 0;
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        myGamePiece.speedX = 0;
    }
}
