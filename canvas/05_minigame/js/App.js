import Background from "./Background.js";
import Coin from "./Coin.js";
import GameHandler from "./GameHandler.js";
import Player from "./Player.js";
import Score from "./Score.js";
import Wall from "./Wall.js";

export default class App {
  static canvas = document.querySelector("canvas");
  static ctx = App.canvas.getContext("2d");
  static dpr = window.devicePixelRatio > 1 ? 2 : 1;
  static interval = 1000 / 60;
  static width = 1024;
  static height = 768;

  constructor() {
    this.backgrounds = [
      new Background({
        img: document.querySelector("#bg3-img"),
        speed: -1,
      }),
      new Background({
        img: document.querySelector("#bg2-img"),
        speed: -2,
      }),
      new Background({
        img: document.querySelector("#bg1-img"),
        speed: -4,
      }),
    ];

    this.gameHandler = new GameHandler(this);

    this.reset();

    // bind(this)를 해주지 않으면 this가 window로 바뀌게 됨
  }

  reset() {
    this.walls = [new Wall({ type: "SMALL" })];

    this.player = new Player();
    this.coins = [];

    this.score = new Score();
  }

  init() {
    App.canvas.width = App.width * App.dpr;
    App.canvas.height = App.height * App.dpr;
    App.ctx.scale(App.dpr, App.dpr);

    // 배경
    this.backgrounds.forEach((background) => {
      background.draw();
    });
  }

  render() {
    let now,
      delta,
      then = Date.now();
    const frame = () => {
      requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;

      if (delta < App.interval) return;

      if (this.gameHandler.status !== "PLAYING") {
        return;
      }

      App.ctx.clearRect(0, 0, App.width, App.height);

      // 배경
      this.backgrounds.forEach((background) => {
        background.update();
        background.draw();
      });

      // 벽
      for (let i = this.walls.length - 1; i >= 0; i--) {
        const wall = this.walls[i];

        wall.update();
        wall.draw();

        // 벽 제거
        if (wall.isOutside) {
          this.walls.splice(i, 1);
          continue;
        }
        // 벽 생성
        if (wall.canGenerateNext) {
          wall.generatedNext = true;
          const newWall = new Wall({ type: Math.random() > 0.3 ? "SMALL" : "BIG" });
          this.walls.push(newWall);

          // 코인 생성
          if (Math.random() < 0.5) {
            const x = newWall.x + newWall.width / 2;
            const y = newWall.y2 - newWall.gapY / 2;
            this.coins.push(new Coin(x, y, newWall.vx));
          }
        }

        // 벽과 플레이어 충돌
        if (wall.isColliding(this.player.boundingBox)) {
          this.gameHandler.status = "FINISHED";
          break;
        }
      }

      this.player.update();
      this.player.draw();

      if (this.player.y >= App.height || this.player.y + this.player.height <= 0) {
        // 벽 넘음
        this.gameHandler.status = "FINISHED";
      }

      // 코인
      for (let i = this.coins.length - 1; i >= 0; i--) {
        const coin = this.coins[i];
        coin.update();
        coin.draw();

        if (coin.x + coin.width < 0) {
          this.coins.splice(i, 1);
          continue;
        }

        if (coin.boundingBox.isColliding(this.player.boundingBox)) {
          this.coins.splice(i, 1);
          this.score.coinCount++;
        }
      }

      // 점수
      this.score.update();
      this.score.draw();

      then = now - (delta % App.interval);
    };

    requestAnimationFrame(frame);
  }
}
