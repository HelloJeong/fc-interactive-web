const listWrapper = document.getElementById("list-item-wrapper");

const listItems = document.querySelectorAll(".list-item");

const panel1Img = document.getElementById("panel1-img");
const flyingSantaImage = document.getElementById("flying-santa-image");

const videoPlayBack = 500;

const videoElement = document.getElementById("video");
const videoSection = document.getElementById("video-section");

const fixedWrapper = document.getElementById("fixed-wrapper");

const fixedDescription = document.getElementById("fixed-description");

function centerElement(elementId, video) {
  const element = document.getElementById(elementId);
  const parent = element.parentElement;

  if (window.scrollY > parent.offsetTop - (document.documentElement.clientHeight - element.offsetHeight) / 2) {
    element.style.position = "fixed";
    element.style.top = "50%";
    element.style.left = "50%";
    element.style.transform = `translate(-50%, -50%)`;

    if (video) video.currentTime = (window.scrollY - videoSection.offsetTop) / videoPlayBack;
  } else {
    element.style.position = "relative";
    element.style.top = "initial";
    element.style.left = "initial";
    element.style.transform = "initial";
  }
}

videoElement.addEventListener("loadedmetadata", () => {
  document.getElementById("video-section").style.height = videoElement.duration * videoPlayBack + "px";
});

const fixedDescriptionAppearTiming = 3470;
const fixedDescriptionAppearEnds = 3800;

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
  if (scrollYBottom > panel1Img.offsetTop && scrollYBottom < panel1Img.offsetTop + panel1Img.offsetHeight + 100) {
    const speed = 1.7;
    const divisionValue = panel1Img.offsetHeight + 100;
    const translateX = 80 - (80 * (scrollYBottom - panel1Img.offsetTop)) / divisionValue;
    const translateY = -13 + (13 * (scrollYBottom - panel1Img.offsetTop)) / divisionValue;
    const rotationDegree = 23 - (23 * speed * (scrollYBottom - panel1Img.offsetTop)) / divisionValue;
    flyingSantaImage.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotationDegree}deg)`;
  }

  centerElement("fixed-wrapper", videoElement);

  if (window.scrollY > videoSection.offsetTop + videoSection.offsetHeight - (fixedWrapper.offsetHeight + (document.documentElement.clientHeight - fixedWrapper.offsetHeight) / 2)) {
    fixedWrapper.style.position = "relative";
    fixedWrapper.style.top = "initial";
    fixedWrapper.style.left = "initial";
    fixedWrapper.style.transform = `translateY(${videoSection.offsetHeight - fixedWrapper.offsetHeight}px)`;
  }

  if (window.scrollY > fixedDescriptionAppearTiming && window.scrollY < fixedDescriptionAppearEnds) {
    fixedDescription.style.transform = `translateY(${fixedDescriptionAppearEnds - window.scrollY}px)`;

    fixedDescription.style.opacity = (window.scrollY - fixedDescriptionAppearTiming) / 300;
  } else if (window.scrollY > fixedDescriptionAppearEnds) {
    fixedDescription.style.transform = `translateY(0px)`;
    fixedDescription.style.opacity = 1;
  } else {
    fixedDescription.style.transform = `translateY(100px)`;
    fixedDescription.style.opacity = 0;
  }

  centerElement("bank-beyond");
});

let currentImage = 0;

const sliderImages = document.querySelectorAll(".slider-image");

const sliderIndex = document.getElementById("slider-index");

const handleSlideChange = (step) => {
  currentImage += step;

  if (currentImage < 0) {
    currentImage = sliderImages.length - 1;
  } else if (currentImage >= sliderImages.length) {
    currentImage = 0;
  }

  sliderContentWrapper.scrollLeft = sliderImages[currentImage].offsetLeft;
};

document.getElementById("left-button").addEventListener("click", () => {
  handleSlideChange(-1);
});
document.getElementById("right-button").addEventListener("click", () => {
  handleSlideChange(1);
});

const sliderContentWrapper = document.getElementById("slider-content-wrapper");

sliderContentWrapper.addEventListener("scroll", () => {
  const imageWidth = document.querySelectorAll(".slider-image")[0].offsetWidth;

  currentImage = Math.round(sliderContentWrapper.scrollLeft / imageWidth);
  sliderIndex.innerText = `${currentImage + 1}/${sliderImages.length}`;
});
