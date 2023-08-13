import Particle from "./js/Particle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;

const fps = 60;
const interval = 1000 / fps;

let canvasWidth = innerWidth;
let canvasHeight = innerHeight;

const particles = [];

function init() {
  canvasWidth = innerWidth;
  canvasHeight = innerHeight;

  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;

  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";

  ctx.scale(dpr, dpr);
}

function createRing() {
  const PARTICLE_NUM = 100;
  for (let i = 0; i < PARTICLE_NUM; i++) {
    particles.push(new Particle());
  }
}

function render() {
  let now,
    delta,
    then = Date.now();

  const frame = () => {
    requestAnimationFrame(frame);
    now = Date.now();
    delta = now - then;

    if (delta < interval) return;

    particles.forEach((particle, index) => {
      particle.update(ctx);
      particle.draw(ctx);
    });

    then = now - (delta % interval);
  };

  requestAnimationFrame(frame);
}

window.addEventListener("load", () => {
  init();
  render();
});

window.addEventListener("resize", init);

window.addEventListener("click", () => {
  createRing();
});
