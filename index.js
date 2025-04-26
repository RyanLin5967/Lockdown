const playButton = document.getElementById('playbtn');
const mainpage = document.getElementById('mainpage');

var myGamePiece;

function toGame(){
    startGame();
}

function startGame() {
    myGameArea.start();
    myGamePiece = new component(30, 30, "red", 10, 120);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20); // Update game area every 20ms
        window.addEventListener('keydown', keyDownHandler);
        window.addEventListener('keyup', keyUpHandler);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;    

    this.update = function() {
        let ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
}

function keyDownHandler(e) {
    if (e.key === "ArrowUp") {
        myGamePiece.speedY = -2;
    }
    if (e.key === "ArrowDown") {
        myGamePiece.speedY = 2;
    }
    if (e.key === "ArrowLeft") {
        myGamePiece.speedX = -2;
    }
    if (e.key === "ArrowRight") {
        myGamePiece.speedX = 2;
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
