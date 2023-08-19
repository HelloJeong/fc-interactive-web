import App from "./App.js";
import BoundingBox from "./BoundingBox.js";
import { randomNumBetween } from "./utils.js";

export default class Wall {
  constructor(config) {
    this.img = document.querySelector("#wall-img");
    this.type = config.type; // 'BIG' | 'SMALL'
    switch (this.type) {
      case "BIG":
        this.sizeX = 18 / 30;
        this.sx = this.img.width * (9 / 30);
        break;
      case "SMALL":
        this.sizeX = 9 / 30; // png 파일에서 30칸 중에 9칸을 차지하고 있음
        this.sx = this.img.width * (0 / 30);
        break;
    }
    this.width = App.height * this.sizeX;
    this.height = App.height;
    this.gapY = randomNumBetween(App.height * 0.1, App.height * 0.35);
    this.x = App.width;
    // 윗 벽(y1)
    // min : -this.height
    // max : App.height - this.gapY - this.height
    // 공통인 -this.height를 밖으로 빼고 y1 값 설정
    // 벽이 canvas 경계에 딱 맞아 떨어지기 때문에 30 픽셀정도를 더 줌
    this.y1 = -this.height + randomNumBetween(30, App.height - this.gapY - 30);
    this.y2 = this.y1 + this.height + this.gapY;

    this.generatedNext = false;
    this.gapNextX = App.width * randomNumBetween(0.6, 0.75);

    this.boundingBox1 = new BoundingBox(this.x + 30, this.y1 + 30, this.width - 60, this.height - 60);
    this.boundingBox2 = new BoundingBox(this.x + 30, this.y2 + 30, this.width - 60, this.height - 60);

    this.vx = -6;
  }
  get isOutside() {
    return this.x + this.width < 0;
  }
  get canGenerateNext() {
    return !this.generatedNext && this.x + this.width < this.gapNextX;
  }

  isColliding(target) {
    return this.boundingBox1.isColliding(target) || this.boundingBox2.isColliding(target);
  }

  update() {
    this.x += this.vx;
    this.boundingBox1.x = this.boundingBox2.x = this.x + 30;
  }
  draw() {
    App.ctx.drawImage(this.img, this.sx, 0, this.img.width * this.sizeX, this.img.height, this.x, this.y1, this.width, this.height);
    App.ctx.drawImage(this.img, this.sx, 0, this.img.width * this.sizeX, this.img.height, this.x, this.y2, this.width, this.height);

    // this.boundingBox1.draw();
    // this.boundingBox2.draw();
  }
}
