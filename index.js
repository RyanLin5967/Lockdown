const playButton = document.getElementById("playbtn");
const mainpage = document.getElementById("mainpage");

var player;
var toiletPapers = [];
var score = 0; 

let backgroundImage = new Image();
backgroundImage.src = "tile.webp";

function toGame() {
  startGame();
}

function startGame() {
  shop.start();
  player = new component(75, 75, "guy.png", 100, 120, "image");
  

  for (let i = 0; i < 5; i++) {
    spawnToiletPaper();
  }

  randomSpawner();
}

var shop = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);
    window.addEventListener("resize", () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });
  },
  clear: function () {
    if (score >= 20) {
      this.context.fillStyle = "green";
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.fillStyle = "white"; 
      this.context.font = "40px Arial";
      this.context.textAlign = "center";
      this.context.fillText(
        "You Win!",
        this.canvas.width / 2,
        this.canvas.height / 2
      );
    } else {
      
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(
        backgroundImage,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    }
  },
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
    this.image.src = color;
  }

  this.update = function () {
    let ctx = shop.context;
    if (this.type === "image") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };

  this.newPos = function () {
    this.x += this.speedX;
    this.y += this.speedY;

    
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
    if (this.x + this.width > shop.canvas.width)
      this.x = shop.canvas.width - this.width;
    if (this.y + this.height > shop.canvas.height)
      this.y = shop.canvas.height - this.height;
  };

  this.crashWith = function (other) {
    return !(
      this.x + this.width < other.x ||
      this.x > other.x + other.width ||
      this.y + this.height < other.y ||
      this.y > other.y + other.height
    );
  };
}

const bgMusic = new Audio("music.wav");
bgMusic.loop = true;
bgMusic.volume = 0.5;

window.addEventListener(
  "keydown",
  () => {
    bgMusic.play();
  },
  { once: true }
);

function spawnToiletPaper() {
  let tries = 0;
  let maxTries = 50;
  let newToiletPaper;
  let overlap;

  do {
    let randomX = Math.floor(Math.random() * (shop.canvas.width - 30));
    let randomY = Math.floor(Math.random() * (shop.canvas.height - 30));
    newToiletPaper = new component(
      50,
      50,
      "toiletpaper.webp",
      randomX,
      randomY,
      "image"
    );

    
    overlap = toiletPapers.some((square) => {
      return !(
        newToiletPaper.x + newToiletPaper.width < square.x ||
        newToiletPaper.x > square.x + square.width ||
        newToiletPaper.y + newToiletPaper.height < square.y ||
        newToiletPaper.y > square.y + square.height
      );
    });

    tries++;
  } while (overlap && tries < maxTries);
  if (!overlap) {
    toiletPapers.push(newToiletPaper);
  }
}

function updateGameArea() {
  shop.clear();
  player.newPos();
  player.update();

  for (let i = 0; i < toiletPapers.length; i++) {
    toiletPapers[i].update();
  }

  for (let i = toiletPapers.length - 1; i >= 0; i--) {
    if (player.crashWith(toiletPapers[i])) {
      toiletPapers.splice(i, 1);
      score += 1;
    }
  }
  if (score === 20) {
    setTimeout(() => {
      location.reload();
    }, 0);
  }
  drawScore();
}

function drawScore() {
  let ctx = shop.context;
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "right";
  ctx.fillText("Toilet Paper Collected: " + score, shop.canvas.width - 50, 30);
}
function randomSpawner() {
  let randomDelay = Math.random() * 3000 + 1000;
  setTimeout(() => {
    spawnToiletPaper();
    randomSpawner();
  }, randomDelay);
}
function keyDownHandler(e) {
  if (e.key === "ArrowUp") {
    player.speedY = -4;
  }
  if (e.key === "ArrowDown") {
    player.speedY = 4;
  }
  if (e.key === "ArrowLeft") {
    player.speedX = -4;
  }
  if (e.key === "ArrowRight") {
    player.speedX = 4;
  }
}

function keyUpHandler(e) {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    player.speedY = 0;
  }
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    player.speedX = 0;
  }
}
