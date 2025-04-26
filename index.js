const playButton = document.getElementById('playbtn');
const canvas = document.getElementById('canvas1');
const mainpage = document.getElementById('mainpage');
const ctx = canvas.getContext('2d');

const gmae1 = document.getElementById('game1');
const gmae2 = document.getElementById('game2');
const gmae3 = document.getElementById('game3');

function resizeCanvas() {
    gmae1.style.display = 'block';
    gmae2.style.display = 'block';
    gmae3.style.display = 'block';
    playButton.style.display = 'none';
  }

