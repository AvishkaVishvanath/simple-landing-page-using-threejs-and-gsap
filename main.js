import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import gsap from 'gsap';

// Scene
const scene = new THREE.Scene();

// Sphere
const geometry = new THREE.SphereGeometry(6, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
  roughness: 0.5
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Light
const light = new THREE.PointLight(0xffffff, 200, 100);
light.position.set(10, 15, 15); // x,y,z
scene.add(light);

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 100);
camera.position.z = 45; // Changed camera position
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.setClearColor(0x000000); // Set clear color to black
renderer.render(scene, camera);

//Controls
const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

//resize
window.addEventListener("resize", () => {
  // Update size
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  // update camera
  camera.updateProjectionMatrix();
  camera.aspect = sizes.width / sizes.height;
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}

loop();

//timeline
const tl = gsap.timeline({defaults: {duration:1}})
tl.fromTo(mesh.scale, {z:0,x:0,y:0}, {z:1,x:1,y:1})
tl.fromTo('nav', {y: "-100%"}, {y: "0%"})
tl.fromTo(".title", {opacity: 0}, {opacity: 1})

//Mouse Animation Color
let mouseDown = false;
let rgb = []

window.addEventListener("mousemove", () => {
  mouseDown = true;
});
window.addEventListener("mouseup", () => {
  mouseDown = false;
});

window.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    rgb = [
      Math.round((e.pageX / sizes.width) *255),
      Math.round((e.pageY / sizes.height) *255),
      Math.floor((Math.random() * 255))
    ]

    //Animate the colour
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color, {
      r:newColor.r, 
      g:newColor.g, 
      b:newColor.b
    })
  }
});