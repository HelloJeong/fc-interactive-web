import { useEffect, useRef } from "react";
import throttle from "lodash/throttle";
import "../style/containers/Nudake.css";

import image1 from "../assets/nudake-1.jpg";
import image2 from "../assets/nudake-2.jpg";
import image3 from "../assets/nudake-3.jpg";
import { getAngle, getDistance, getScrupedPercent } from "../utils/utils";

const Nudake = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasParent = canvas.parentNode;
    const ctx = canvas.getContext("2d");

    const imageSrcs = [image1, image2, image3];
    let currIndex = 0;
    let prevPos = { x: 0, y: 0 };

    let canvasWidth, canvasHeight;

    function resize() {
      canvasWidth = canvasParent.clientWidth;
      canvasHeight = canvasParent.clientHeight;

      canvas.style.width = canvasWidth + "px";
      canvas.style.height = canvasHeight + "px";

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      drawImage();
    }

    function drawImage() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      const image = new Image();
      image.src = imageSrcs[currIndex];
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
      };
    }

    function onMousedown(e) {
      canvas.addEventListener("mouseup", onMouseup);
      canvas.addEventListener("mouseleave", onMouseup);
      canvas.addEventListener("mousemove", onMousemove);
      prevPos = {
        x: e.offsetX,
        y: e.offsetY,
      };
    }
    function onMouseup() {
      canvas.removeEventListener("mouseup", onMouseup);
      canvas.removeEventListener("mouseleave", onMouseup);
      canvas.removeEventListener("mousemove", onMousemove);
    }
    function onMousemove(e) {
      drawCircles(e);
      checkPercent();
    }
    function drawCircles(e) {
      const nextPos = { x: e.offsetX, y: e.offsetY };

      const dist = getDistance(prevPos, nextPos);
      const angle = getAngle(prevPos, nextPos);

      for (let i = 0; i < dist; i++) {
        const x = prevPos.x + Math.cos(angle) * i;
        const y = prevPos.y + Math.sin(angle) * i;

        ctx.globalCompositeOperation = "destination-out"; // 그림을 지워주는 효과
        ctx.beginPath();
        ctx.arc(x, y, 50, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }

      prevPos = nextPos;
    }

    const checkPercent = throttle(() => {
      const percent = getScrupedPercent(ctx, canvasWidth, canvasHeight);
      console.log("percent", percent);
    }, 500);

    canvas.addEventListener("mousedown", onMousedown);

    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown", onMousedown);
    };
  }, []);

  return (
    <div className="nudake">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Nudake;
