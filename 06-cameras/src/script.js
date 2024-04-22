import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";

const canvas = document.querySelector("canvas.webgl");

// Window size
const sizes = {
  width: 800,
  height: 600,
};

// Mouse Cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = -(event.clientX / sizes.width - 0.5);
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// Camera
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(70, aspectRatio, 1, 100);

camera.position.z = 3;

camera.lookAt(mesh.position);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
// controls.target.y = 1;
// controls.update();
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

const tick = () => {
  // Update camera
  //   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  //   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  //   camera.position.y = cursor.y * 5;
  //   camera.lookAt(mesh.position);

  // Render
  renderer.render(scene, camera);

  // Update controls for the next frame
  controls.update();

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
