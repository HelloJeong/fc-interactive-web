const listWrapper = document.getElementById("list-item-wrapper");

const listItems = document.querySelectorAll(".list-item");

const panel1Img = document.getElementById("panel1-img");
const flyingSantaImage = document.getElementById("flying-santa-image");

window.addEventListener("scroll", () => {
  const clientHeight = document.documentElement.clientHeight;
  const listStyleChangeStartY = listWrapper.offsetTop;
  const listStyleChangeEndY = listWrapper.offsetTop + listWrapper.offsetHeight;
  const division = (listStyleChangeEndY - listStyleChangeStartY) / listItems.length;

  // console.log("window.scrollY", window.scrollY);
  // console.log("clientHeight", clientHeight);
  // console.log("listStyleChangeStartY", listStyleChangeStartY);
  // console.log("listStyleChangeEndY", listStyleChangeEndY);

  if (document.getElementById("on")) document.getElementById("on").removeAttribute("id");

  const newScrollYValue = window.scrollY + clientHeight - division * 4;
  // console.log("newScrollYValue", newScrollYValue);
  if (newScrollYValue > listStyleChangeStartY && newScrollYValue < listStyleChangeEndY) {
    const index = Math.floor((newScrollYValue - listStyleChangeStartY) / division);

    listItems[index].id = "on";
  }

  const scrollYBottom = window.scrollY + clientHeight;
  // console.log("scrollYBottom", scrollYBottom);
  if (
    scrollYBottom > panel1Img.offsetTop &&
    scrollYBottom < panel1Img.offsetTop + panel1Img.offsetHeight + 100
  ) {
    const speed = 1.7;
    const divisionValue = panel1Img.offsetHeight + 100;
    const translateX = 80 - (80 * (scrollYBottom - panel1Img.offsetTop)) / divisionValue;
    const translateY = -13 + (13 * (scrollYBottom - panel1Img.offsetTop)) / divisionValue;
    const rotationDegree =
      23 - (23 * speed * (scrollYBottom - panel1Img.offsetTop)) / divisionValue;
    flyingSantaImage.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotationDegree}deg)`;
  }
});
