const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 300;
const DPR = window.devicePixelRatio;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.style.width = `${CANVAS_WIDTH}px`;
canvas.style.height = `${CANVAS_HEIGHT}px`;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.scale(DPR, DPR);

ctx.fillRect(10, 10, 50, 50);
