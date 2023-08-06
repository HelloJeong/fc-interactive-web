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
