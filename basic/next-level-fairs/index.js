document.addEventListener("mousemove", (e) => {
  const cursorDefaultInner = document.querySelector(".cursor__default__inner");
  const cursorTraceInner = document.querySelector(".cursor__trace__inner");
  const { clientX, clientY } = e;
  cursorDefaultInner.style.top = clientY + "px";
  cursorDefaultInner.style.left = clientX + "px";

  cursorTraceInner.style.top = clientY + "px";
  cursorTraceInner.style.left = clientX + "px";
});

const cursor = document.querySelector(".cursor");

document.addEventListener("mousedown", (e) => {
  cursor.classList.add("cursor--active");
});

document.addEventListener("mouseup", (e) => {
  cursor.classList.remove("cursor--active");
});

function createRipple({ clientX, clientY }) {
  const ripple = document.createElement("span");

  ripple.classList.add("ripple");

  cursor.appendChild(ripple);

  ripple.style.top = `${clientY - ripple.clientHeight / 2}px`;
  ripple.style.left = `${clientX - ripple.clientWidth / 2}px`;

  ripple.addEventListener("animationend", () => {
    cursor.removeChild(ripple);
  });
}

document.addEventListener("click", (e) => {
  createRipple(e);
});

const preloaderBtn = document.querySelector(".preloader__btn");

let intervalId = null;
let scale = 1;

const preloaderHideThreshold = 18;

function setPreloaderStyle(scale) {
  preloaderBtn.style.transform = `scale(${scale})`;
  document.querySelector(".preloader__btn_hold").style.opacity =
    1 - (scale - 1) / preloaderHideThreshold;
}

preloaderBtn.addEventListener("mousedown", () => {
  intervalId = setInterval(() => {
    scale += 0.175;

    setPreloaderStyle(scale);

    if (scale >= 1 + preloaderHideThreshold) {
      const header = document.querySelector(".header");

      document.querySelector(".preloader").classList.add("hidden-area");

      header.classList.remove("hidden-area");
      header.classList.add("shown-area");

      clearInterval(intervalId);
    }
  }, 10);
});

preloaderBtn.addEventListener("mouseup", () => {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    scale -= 0.075;

    setPreloaderStyle(scale);

    if (scale <= 1) {
      clearInterval(intervalId);
    }
  }, 10);
});
