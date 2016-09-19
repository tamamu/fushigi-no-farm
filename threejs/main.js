let scene, camera, light, renderer;
let geometry, material, mesh;

let floors = [];

let tex;
let spm;
let sprite;

let lastRender = Date.now();

window.onload = () => {
  init();
  animate();
}

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  camera.rotation.x = 1.5;
  camera.position.y = -780;
  camera.position.z = 200;

  geometry = new THREE.BoxGeometry(100, 100, 100);
  material = new THREE.MeshLambertMaterial({color: 0x999999, wireframe: false});

  //mesh = new THREE.Mesh(geometry, material);
  for(let i=0; i < 100; i=(i+1)|0) {
    let x = (i%10)|0;
    let y = ((i-x)/10)|0;
    floors[i] = new THREE.Mesh(geometry, material);
    floors[i].position.x = x * 100 - 300;
    floors[i].position.y = y * 100 - 300;
    scene.add(floors[i]);
  }
  //scene.add(mesh);

  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);

  let plane = new THREE.PlaneGeometry(32, 64);
  tex = new THREE.TextureLoader().load("chara-mock.png");
  spm = new THREE.MeshBasicMaterial({map: tex, transparent: true});
  sprite = new THREE.Mesh(plane, spm);
  sprite.rotation.x = Math.PI/2;
  sprite.position.x = 0;
  sprite.position.y = -320;
  sprite.position.z = 100;
  scene.add(sprite);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

}

function animate() {
  if (Date.now() - lastRender > 1000/60) { 
	//camera.position.y += 1;
    //sprite.rotation.y += 0.05;

    renderer.render(scene, camera);
    lastRender = Date.now();
  }
  requestAnimationFrame(animate);
}
