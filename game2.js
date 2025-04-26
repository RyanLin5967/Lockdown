const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//var $score = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;

const playerImg = new Image();
playerImg.src = 'guy.png';

const virusImg = new Image();
virusImg.src = 'virus.webp';


const bgMusic = new Audio('music.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.5;

window.addEventListener('keydown', () => {
    bgMusic.play();
}, { once: true });

const player = {
    x: 150,
    y: canvas.height / 2,
    width: 50,
    height: 50,
    velocity: 0,
    gravity: 0.5,
    jumpStrength: -10,
    update: function() {
        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
            this.velocity = 0;
        }

        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    },
    draw: function() {
        ctx.drawImage(playerImg, this.x, this.y, this.width, this.height);
    },
    jump: function() {
        this.velocity = this.jumpStrength;
    }
};

const viruses = [];

let score = 0;
let scoreTimer = 0;

function spawnVirus() {
    const size = 40 + Math.random() * 30;
    const y = Math.random() * (canvas.height - size);
    viruses.push({
        x: canvas.width,
        y: y,
        width: size,
        height: size,
        speed: 4
    });
}

function updateViruses() {
    for (let i = 0; i < viruses.length; i++) {
        viruses[i].x -= viruses[i].speed;
    }

    for (let i = viruses.length - 1; i >= 0; i--) {
        if (viruses[i].x + viruses[i].width < 0) {
            viruses.splice(i, 1);
        }
    }
}

function drawViruses() {
    for (let virus of viruses) {
        ctx.drawImage(virusImg, virus.x, virus.y, virus.width, virus.height);
    }
}


function checkCollision() {
    for (let virus of viruses) {
        if (
            player.x < virus.x + virus.width &&
            player.x + player.width > virus.x &&
            player.y < virus.y + virus.height &&
            player.y + player.height > virus.y
        ) {
            gameOver();
        }
    }
}

let isGameOver = false;
let gameOverTimer = 0;

function gameOver() {
    isGameOver = true;
    gameOverTimer = 0;
}

window.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        player.jump();
    }
});

let spawnTimer = 0;

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    scoreTimer++;
    ctx.fillStyle = 'black';
    ctx.font = '40px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Score: ' + score, 20, 50);
    
    
    if (!isGameOver) {
        if (scoreTimer > 10) {
            score++;
            scoreTimer = 0;
        }
        player.update();
        player.draw();

        updateViruses();
        drawViruses();

        checkCollision();

        spawnTimer++;
        if (spawnTimer > 80) { 
            spawnVirus();
            spawnTimer = 0;
        }
    } else {
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

       
        ctx.fillStyle = 'white';
        ctx.font = '80px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('DEAD', canvas.width / 2, canvas.height / 2);

      
        ctx.font = '40px Arial';
        ctx.fillText('Score: ' + score, canvas.width / 2, canvas.height / 2 + 60);
        
        gameOverTimer++;
        if (gameOverTimer > 100) {
            document.location.reload();
        }
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();