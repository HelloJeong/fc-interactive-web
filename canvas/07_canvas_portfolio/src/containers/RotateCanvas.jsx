import { Bodies, Composite, Engine, Mouse, MouseConstraint, Render, Runner } from "matter-js";
import "../style/containers/rotateCanvas.css";
import { useEffect, useRef } from "react";

const RotateCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cw = 1000;
    const ch = 1000;

    let engine, render, runner, mouse, mouseConstraint;

    initScene();
    initMouse();
    initGround();

    canvas.addEventListener("click", createBox);

    function initScene() {
      engine = Engine.create();
      render = Render.create({
        canvas,
        engine,
        options: {
          width: cw,
          height: ch,
          wireframes: false,
          background: "#1b1b19",
        },
      });
      runner = Runner.create();

      Render.run(render);
      Runner.run(runner, engine);
    }

    function initMouse() {
      mouse = Mouse.create(canvas);
      mouseConstraint = MouseConstraint.create(engine, {
        mouse,
      });
      Composite.add(engine.world, mouseConstraint);
    }

    function initGround() {
      const ground = Bodies.rectangle(cw / 2, ch, cw, 50, { isStatic: true });
      Composite.add(engine.world, ground);
    }
    function createBox() {
      const box = Bodies.rectangle(mouse.position.x, mouse.position.y, 50, 50);
      Composite.add(engine.world, box);
    }
  }, []);

  return (
    <div className="rotate-canvas-wrapper">
      <canvas ref={canvasRef}></canvas>
      <aside>
        <h1>Javascript</h1>
        <h2>⭐️⭐️⭐️⭐️⭐️</h2>
        <p>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages
          and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </p>
      </aside>
    </div>
  );
};

export default RotateCanvas;
