const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 300;
const DPR = window.devicePixelRatio;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.style.width = `${CANVAS_WIDTH}px`;
canvas.style.height = `${CANVAS_HEIGHT}px`;

canvas.width = CANVAS_WIDTH * DPR;
canvas.height = CANVAS_HEIGHT * DPR;

ctx.scale(DPR, DPR);

class Particle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }
}

const x = 100;
const y = 100;
const radius = 50;
const particle = new Particle(x, y, radius);

function animate() {
  window.requestAnimationFrame(animate);

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  particle.draw();
}

animate();
