'use strict';

// some features need the be polyfilled..
// https://babeljs.io/docs/usage/polyfill/

// import 'babel-core/polyfill';
// or import specific polyfills
// import {$} from './helpers/util';

let scene, camera, renderer;
let OrbitControls = require('three-orbit-controls')(THREE);

const render = () => {

  renderer.render(scene, camera);
  requestAnimationFrame(() => render());

};

const init = () => {

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    45, window.innerWidth / window.innerHeight, 1, 10000
  );

  renderer = new THREE.WebGLRenderer();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );

  new OrbitControls(camera);

  document.querySelector('.append').appendChild(renderer.domElement);

  console.log(renderer);

  camera.position.z = 1500;
  render();
};

init();
