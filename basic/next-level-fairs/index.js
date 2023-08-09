const cursorDefaultInner = document.querySelector(".cursor__default__inner");
const cursorTraceInner = document.querySelector(".cursor__trace__inner");

let mouseX = 0,
  mouseY = 0;

const MouseMoveListener = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

const interval = 1000 / 60; // target => 60fps
let now, delta;
let then = Date.now();

const firstPageMouseAnimate = () => {
  window.requestAnimationFrame(firstPageMouseAnimate);

  now = Date.now(); // 현재 call된 시간
  delta = now - then; // 차이값

  if (delta < interval) {
    // 내가 요구하는 fps에 적합하지 않음
    return;
  }

  // 적합하기 때문에 animation 작업 해주면 됨

  cursorDefaultInner.style.top = mouseY + "px";
  cursorDefaultInner.style.left = mouseX + "px";

  cursorTraceInner.style.top = mouseY + "px";
  cursorTraceInner.style.left = mouseX + "px";

  then = now - (delta % interval); // then을 바꿔줌(다음 프레임)
};

window.addEventListener("load", () => {
  firstPageMouseAnimate();
});
document.addEventListener("mousemove", MouseMoveListener);

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
  document.querySelector(".preloader__btn_hold").style.opacity = 1 - (scale - 1) / preloaderHideThreshold;
}

const header = document.querySelector(".header");

preloaderBtn.addEventListener("mousedown", () => {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    scale += 0.175;

    setPreloaderStyle(scale);

    if (scale >= 1 + preloaderHideThreshold) {
      document.querySelector(".preloader").classList.add("hidden-area");

      const poster = document.querySelector(".poster");
      header.classList.remove("hidden-area");
      poster.classList.remove("hidden-area");

      header.classList.add("shown-area");
      poster.classList.add("shown-area");
      headerAnimate();
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

let xRelativeToHeader, yRelativeToHeader;

const HeaderMouseMoveListener = (e) => {
  xRelativeToHeader = e.clientX / header.clientWidth;
  yRelativeToHeader = e.clientY / header.clientHeight;
};

header.addEventListener("mousemove", HeaderMouseMoveListener);

let headerAnimateNow, headerAnimateDelta;
let headerAnimateThen = Date.now();

const headerAnimate = () => {
  window.requestAnimationFrame(headerAnimate);

  headerAnimateNow = Date.now(); // 현재 call된 시간
  headerAnimateDelta = headerAnimateNow - headerAnimateThen; // 차이값

  if (headerAnimateDelta < interval) {
    // 내가 요구하는 fps에 적합하지 않음
    return;
  }

  document.querySelector(".header__title").style.transform = `translate(${xRelativeToHeader * -50}px, ${yRelativeToHeader * -50}px)`;

  document.querySelector("#circle-1").style.transform = `translate(${xRelativeToHeader * -25}px, ${yRelativeToHeader * -25}px)`;

  document.querySelector("#circle-2").style.transform = `translate(${xRelativeToHeader * 25}px, ${yRelativeToHeader * 25}px)`;

  document.querySelector("#cube__image_1").style.transform = `translate(${xRelativeToHeader * -15}px, ${yRelativeToHeader * -15}px)`;
  document.querySelector("#cube__image_2").style.transform = `translate(${xRelativeToHeader * -8}px, ${yRelativeToHeader * -8}px)`;
  document.querySelector("#cube__image_3").style.transform = `translate(${xRelativeToHeader * -20}px, ${yRelativeToHeader * -20}px)`;
  document.querySelector("#cube__image_4").style.transform = `translate(${xRelativeToHeader * 5}px, ${yRelativeToHeader * 5}px)`;

  headerAnimateThen = headerAnimateNow - (headerAnimateDelta % interval); // then을 바꿔줌(다음 프레임)
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("poster-image_state_visible");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".poster-image_wrapper").forEach((poster) => {
  observer.observe(poster);
});

const posterParallax = document.querySelector(".poster__parallax");

posterParallax.addEventListener("mousemove", (e) => {
  const xRelativeToPosterParallax = e.clientX / posterParallax.clientWidth;
  const yRelativeToPosterParallax = e.clientY / posterParallax.clientHeight;

  document.querySelector("#poster-image_wrapper_2").style.transform = `translate(${xRelativeToPosterParallax * -40}px, ${yRelativeToPosterParallax * -40}px)`;
  document.querySelector("#poster-image_wrapper_3").style.transform = `translate(${xRelativeToPosterParallax * 40}px, ${yRelativeToPosterParallax * 40}px)`;
});
