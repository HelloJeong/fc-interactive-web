const CANVAS_WIDTH = innerWidth;
const CANVAS_HEIGHT = innerHeight;
const DPR = window.devicePixelRatio;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.style.width = `${CANVAS_WIDTH}px`;
canvas.style.height = `${CANVAS_HEIGHT}px`;

canvas.width = CANVAS_WIDTH * DPR;
canvas.height = CANVAS_HEIGHT * DPR;

ctx.scale(DPR, DPR);

class Particle {
  constructor(x, y, radius, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vy = vy;
    this.acc = 1.03;
  }
  update() {
    this.vy *= this.acc;
    this.y += this.vy;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
  }
}

const x = 100;
const y = 100;
const radius = 50;
const particle = new Particle(x, y, radius);

const TOTAL = 20;
const randomNumBetween = (min, max) => Math.random() * (max - min + 1) + min;

const particles = Array(TOTAL)
  .fill(0)
  .map(() => {
    const x = randomNumBetween(0, CANVAS_WIDTH);
    const y = randomNumBetween(0, CANVAS_HEIGHT);
    const radius = randomNumBetween(50, 100);
    const vy = randomNumBetween(1, 5);
    return new Particle(x, y, radius, vy);
  });

const interval = 1000 / 60; // target => 60fps
let now, delta;
let then = Date.now();

function animate() {
  window.requestAnimationFrame(animate);
  now = Date.now();
  delta = now - then;

  if (delta < interval) {
    return;
  }

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();

    if (particle.y - particle.radius > CANVAS_HEIGHT) {
      particle.y = -particle.radius;
      particle.x = randomNumBetween(0, CANVAS_WIDTH);
      particle.radius = randomNumBetween(50, 100);
      particle.vy = randomNumBetween(1, 5);
    }
  });

  then = now - (delta % interval);
}

animate();
