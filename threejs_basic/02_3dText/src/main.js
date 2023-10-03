import * as THREE from "three";
// import typeface from 'three/examples/fonts/'; // 한글은 지원하지 않음
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import typeface from "./assets/fonts/The Jamsil 3 Regular_Regular.json";

window.addEventListener("load", () => {
  init();
});

function init() {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);

  camera.position.z = 5;

  // Font
  const fontLoader = new FontLoader();

  // 방법 1
  // fontLoader.load(
  //   "./assets/fonts/The Jamsil 3 Regular_Regular.json",
  //   (font) => {
  //     console.log("load", font);
  //   },
  //   (event) => {
  //     console.log("progress", event);
  //   },
  //   (error) => console.log("error", error)
  // );

  // 방법 2
  const font = fontLoader.parse(typeface);
  console.log("font", font);

  render();

  function render() {
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.render(scene, camera);
  }

  window.addEventListener("resize", handleResize);
}
