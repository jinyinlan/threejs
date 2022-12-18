import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene=new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);

const renderer=new THREE.WebGLRenderer({
  canvas:document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(20)

renderer.render(scene,camera)

const geometry=new THREE.TorusGeometry(10,2,16,100)
const material=new THREE.MeshStandardMaterial({ color:0xFF6347});
const torus=new THREE.Mesh(geometry,material)

scene.add(torus)

const pointLight=new THREE.PointLight(0xffffff)
pointLight.position.set(20,5,5)

const ambientLight=new THREE.AmbientLight(0xffffff)
scene.add(pointLight,ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper=new THREE.GridHelper(200,100)
scene.add(lightHelper,gridHelper)

const controls=new OrbitControls(camera,renderer.domElement);

function addStar(){
  const geometry=new THREE.SphereGeometry(0.25,24,24);
  const material=new THREE.MeshStandardMaterial({ color:0xffffff })
  const star= new THREE.Mesh(geometry,material)

  const [x,y,z]=Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture
 
const jeffTexture = new THREE.TextureLoader().load('normal.jpg')
const geometryJeff = new THREE.BoxGeometry(3,3,3);
const materialJeff = new THREE.MeshBasicMaterial({map:jeffTexture})
const jeffBox = new THREE.Mesh(geometryJeff,materialJeff)

scene.add(jeffBox)

const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const normalTexture = new THREE.TextureLoader().load('normal.jpg')
const geometryMoon = new THREE.SphereGeometry(5,21,21)
const materialMoon = new THREE.MeshStandardMaterial(
  {map:moonTexture,
   normalMap:normalTexture
  }
)
const moon=new THREE.Mesh(geometryMoon,materialMoon)
scene.add(moon)

 moon.position.z=-30;
 moon.position.y=10
 moon.position.x=20;

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x+=0.05;
  moon.rotation.y+=0.075;
  moon.rotation.z+=0.05;

  camera.position.z=t*-0.01;
  camera.position.x=t*-0.0002;
  camera.position.y=t*-0.0002;
  

}

document.body.onscroll = moveCamera;
moveCamera();

function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x+=0.01;
  torus.rotation.y+=0.005;
  torus.rotation.Z+=0.01;
  controls.update()
  renderer.render(scene,camera)
}
animate()