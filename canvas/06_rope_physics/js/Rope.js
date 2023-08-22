import Dot from "./Dot.js";
import Stick from "./Stick.js";

export default class Rope {
  constructor(config) {
    this.x = config.x;
    this.y = config.y;
    this.segments = config.segments || 10;
    this.gap = config.gap || 50;
    this.iterations = config.iterations || 10;

    this.dots = [];
    this.sticks = [];

    this.create();
  }

  pin(index) {
    this.dots[index].pinned = true;
  }

  create() {
    for (let i = 0; i < this.segments; i++) {
      this.dots.push(new Dot(this.x, this.y + i * this.gap));
    }
    for (let i = 0; i < this.segments - 1; i++) {
      this.sticks.push(new Stick(this.dots[i], this.dots[i + 1]));
    }
  }
  update(mouse) {
    this.dots.forEach((dot) => {
      dot.update(mouse);
    });

    for (let i = 0; i < this.iterations; i++) {
      // side effect(미처 update를 하지 못하는 경우)를 최소화시키는 방법
      this.sticks.forEach((stick) => {
        stick.update();
      });
    }
  }
  draw(ctx) {
    this.dots.forEach((dot) => {
      dot.draw(ctx);
    });
    this.sticks.forEach((stick) => {
      stick.draw(ctx);
    });
  }
}
