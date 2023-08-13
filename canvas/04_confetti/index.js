const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio > 1 ? 2 : 1;
let canvasWidth = innerWidth;
let canvasHeight = innerHeight;
const interval = 1000 / 60;

const particles = [];

function init() {
  canvasWidth = innerWidth;
  canvasHeight = innerHeight;
  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  ctx.scale(dpr, dpr);
}

function render() {
  let now,
    delta,
    then = Date.now();

  const x = innerWidth / 2;
  let y = innerHeight / 2;
  let widthAlpha = 0;
  const width = 50;
  const height = 50;

  let deg = 0.1;

  const frame = () => {
    requestAnimationFrame(frame);
    now = Date.now();
    delta = now - then;

    if (delta < interval) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    widthAlpha += 0.1;
    deg += 0.1;
    y += 1;

    ctx.save(); // 변환 행렬이 계속 쌓이기 때문에 겹쳐질 수가 있다. 그래서 save -> restore를 사용해서 쌓이는 것을 방지한다.

    ctx.translate(x + width, y + height);

    ctx.rotate(deg);

    ctx.translate(-x - width, -y - height);

    ctx.fillStyle = "red";
    ctx.fillRect(x, y, width * Math.cos(widthAlpha), height * Math.sin(widthAlpha));
    // ctx.fillRect(x, y, width, height);

    // ctx.resetTransform();
    ctx.restore();

    then = now - (delta % interval);
  };

  requestAnimationFrame(frame);
}

window.addEventListener("load", () => {
  init();
  render();
});

window.addEventListener("resize", init);
