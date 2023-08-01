const sun = document.getElementById("sun");

const grayCloud = document.getElementById("gray-clouds");
const whiteCloud = document.getElementById("white-clouds");

const bird1 = document.getElementById("bird1");
const bird2 = document.getElementById("bird2");
const bird3 = document.getElementById("bird3");

const mountain0 = document.getElementById("mountain0");
const mountain1 = document.getElementById("mountain1");
const mountain2 = document.getElementById("mountain2");
const mountain3 = document.getElementById("mountain3");
const mountain4 = document.getElementById("mountain4");
const mountain5 = document.getElementById("mountain5");
const mountain6 = document.getElementById("mountain6");
const mountain7 = document.getElementById("mountain7");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  sun.style.transform = `translateY(${scrollY * 1.05}px)`;

  grayCloud.style.transform = `translateX(${scrollY * 0.125}px)`;
  whiteCloud.style.transform = `translateX(-${scrollY * 0.125}px)`;

  bird1.style.transform = `translateX(${scrollY}px)`;
  bird2.style.transform = `translateX(-${scrollY * 3.5}px)`;
  bird3.style.transform = `translateX(-${scrollY * 0.5}px)`;

  mountain0.style.transform = `translateY(${scrollY * 0.95}px)`;
  mountain1.style.transform = `translateY(${scrollY * 0.93}px)`;
  mountain2.style.transform = `translateY(${scrollY * 0.9}px)`;
  mountain3.style.transform = `translateY(${scrollY * 0.8}px)`;
  mountain4.style.transform = `translateY(${scrollY * 0.7}px)`;
  mountain5.style.transform = `translateY(${scrollY * 0.6}px)`;
  mountain6.style.transform = `translateY(${scrollY * 0.3}px)`;
  mountain7.style.transform = `translateY(${scrollY * 0.1}px)`;
});

document.querySelectorAll("#right-buttons .button-in-header").forEach((v) => {
  v.addEventListener("click", (e) => {
    document.querySelector("#active-menu").removeAttribute("id");

    v.setAttribute("id", "active-menu");
  });
});

const link = document.querySelector(`a[href="#document-title"]`);

link.addEventListener("click", (e) => {
  e.preventDefault();

  document.querySelector("#document-title").scrollIntoView({
    behavior: "smooth",
  });
});
