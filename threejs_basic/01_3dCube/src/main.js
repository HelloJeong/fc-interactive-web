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
  // (fov(시야각), 카메라의 종횡비, near(가까이), far(멀리))
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);

  const geometry = new THREE.BoxGeometry(2, 2, 2);

  // const material = new THREE.MeshBasicMaterial({ color: 0xcc99ff }); // 조명에 영향을 받지 않음, 빛에 의한 음영이 표시 안됨
  const material = new THREE.MeshStandardMaterial({
    color: 0xcc99ff,
    // color: new THREE.Color(0xcc99ff),

    // transparent: true, // 이게 있어야 opacity 같은게 적용 됨
    // opacity: 0.5,

    // visible: false,

    // wireframe: true,

    // side: THREE.FrontSide, // default,
    // side: THREE.BackSide,
    // side: THREE.DoubleSide, // 양면을 보여주려면 리소스를 더 사용하게 됨
  });

  material.color = new THREE.Color(0x00c896);

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

  const clock = new THREE.Clock();

  render();

  function render() {
    // cube.rotation.x = THREE.MathUtils.degToRad(45); // radian이 들어가야하는데 degToRad 로 deg을 넣어도 됨

    // cube.rotation.x += 0.01;
    // cube.position.y = Math.sin(cube.rotation.x);
    // cube.scale.x = Math.cos(cube.rotation.x);

    // cube.rotation.x = Date.now() / 1000;
    // cube.rotation.x = clock.getElapsedTime(); // clock instance가 생성된 후로부터의 시간

    cube.rotation.x += clock.getDelta(); // getDelta가 호출되고나서 다음 getDelta가 호출되는 사이 시간

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  function handleResize() {
    // 카메라의 종횡비도 같이 변경시켜줘야함
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.render(scene, camera);
  }

  window.addEventListener("resize", handleResize);
}
