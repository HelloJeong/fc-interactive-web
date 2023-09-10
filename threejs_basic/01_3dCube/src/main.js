import * as THREE from "three";

window.addEventListener("load", () => {
  init();
});

function init() {
  const renderer = new THREE.WebGLRenderer({
    // alpha: true, // 검정 배경을 없애줌
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  // 물체에 대한 원근감을 표현할 수 있는 카메라
  // (시야각, 카메라의 종횡비, near(가까이), far(멀리))
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);

  const geometry = new THREE.BoxGeometry(2, 2, 2);

  // const material = new THREE.MeshBasicMaterial({ color: 0xcc99ff }); // 조명에 영향을 받지 않음, 빛에 의한 음영이 표시 안됨
  const material = new THREE.MeshStandardMaterial({ color: 0xcc99ff });

  const cube = new THREE.Mesh(geometry, material);

  scene.add(cube);

  // camera.position.z = 5;
  camera.position.set(3, 4, 5); // 기본적으로 카메라는 원점에 있음

  camera.lookAt(cube.position);

  const directionalLight = new THREE.DirectionalLight(0xf0f0f0, 1);

  directionalLight.position.set(-1, 2, 3);

  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // 음영

  ambientLight.position.set(3, 2, 1);
  scene.add(ambientLight);

  renderer.render(scene, camera);
}
