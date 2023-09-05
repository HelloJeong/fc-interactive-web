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

    canvas.addEventListener("mousewheel", () => {
      addRect(mouse.position.x, mouse.position.y, 50, 50);
    });

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
      const segments = 32; // 각
      const deg = (Math.PI * 2) / segments;
      const width = 50;
      const radius = cw / 2 + width / 2;
      const height = radius * Math.tan(deg / 2) * 2;

      for (let i = 0; i < segments; i++) {
        const theta = deg * i;
        const x = radius * Math.cos(theta) + cw / 2;
        const y = radius * Math.sin(theta) + ch / 2;

        // angle 값을 잡아주면 회전하게 됨
        addRect(x, y, width, height, { isStatic: true, angle: theta });
      }
    }
    function addRect(x, y, w, h, options = {}) {
      const rect = Bodies.rectangle(x, y, w, h, options);
      Composite.add(engine.world, rect);
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
