'use strict';

// some features need the be polyfilled..
// https://babeljs.io/docs/usage/polyfill/

// import 'babel-core/polyfill';
// or import specific polyfills
// import {$} from './helpers/util';
let scene, camera, renderer, shape;
let OrbitControls = require('three-orbit-controls')(THREE);
let currentsong = 'mario_-_overworld_theme.mid';

const box = () => {

  let geometry = new THREE.BoxGeometry(31, 31, 31);

  let material = new THREE.MeshBasicMaterial({
    color: 'orange'
  });

  shape = new THREE.Mesh(geometry, material);
  scene.add(shape);

  camera.position.z = 100;
};

const render = () => {

  renderer.render(scene, camera);
  requestAnimationFrame(() => render());

};

const sound = () => {
  MIDI.loadPlugin(function () {
    MIDI.Player.loadFile('midi/' + currentsong, MIDI.Player.start);
    MIDI.Player.timeWarp = 1.0;
    MIDI.Player.addListener(function(data) {
      var note = data.note;
      console.log(note);
      shape.scale.set( 1, 31/note*2, 1 );
    });
  });
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

  sound();

  box();

  render();
};

init();
