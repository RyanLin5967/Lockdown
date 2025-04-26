const playButton = document.getElementById('playbtn');
const canvas = document.getElementById('canvas1');
const mainpage = document.getElementById('mainpage');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.style.display = 'block';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mainpage.style.display = 'none';
  }
