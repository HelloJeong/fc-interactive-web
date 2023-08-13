import { randomNumBetween } from "./utils.js";

export default class Particle {
  constructor() {
    this.rFriction = randomNumBetween(0.95, 1.01);
    this.rAlpha = randomNumBetween(0, 5);
    this.angleFriction = randomNumBetween(0.97, 0.99);
    this.angleAlpha = randomNumBetween(1, 2);
    this.r = innerHeight / 4;
    this.angle = randomNumBetween(0, 360);
    this.opacity = randomNumBetween(0.2, 1);
  }
  update() {
    this.rAlpha *= this.rFriction;
    this.angleAlpha *= this.angleFriction;
    // 퍼져나가려는 성질을 만들어주기
    this.r += this.rAlpha; // 계속 직진하려는 성질을 만들어 줌
    this.angle += this.angleAlpha; // 옆으로 진행하려는 성질

    this.x = innerWidth / 2 + this.r * Math.cos((Math.PI / 180) * this.angle);
    this.y = innerHeight / 2 + this.r * Math.sin((Math.PI / 180) * this.angle);

    this.opacity -= 0.003;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }
}
