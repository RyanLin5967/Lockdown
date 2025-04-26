const playButton = document.getElementById('playbtn');
const mainpage = document.getElementById('mainpage');

var myGamePiece;
var myGamePiece;

function toGame(){

}
function startGame() {
    myGameArea.start();
    myGamePiece = new component(30, 30, "red", 10, 120);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        window.addEventListener('keydown', keyDownHandler);
        window.addEventListener('keyup', keyUpHandler);
    },
    clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}
};

function component(width, height, color, x, y) {
  this.speedY = 0;
  this.speedX = 0;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
}
