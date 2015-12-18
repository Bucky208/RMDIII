'use strict';

// some features need the be polyfilled..
// https://babeljs.io/docs/usage/polyfill/

// import 'babel-core/polyfill';
// or import specific polyfills
// import {$} from './helpers/util';


//import Player from './modules/Player';

let socket;
let soundbox = true;
let currentsong = 'game_of_thrones.mid';

$("#currentsong").text(currentsong);

$( '#demo' ).click(() => {
  socket.emit('joined', 50 );
});

$( '#soundbox' ).click(() => {
  soundbox = true;
  console.log(soundbox);
});

$( '#piano' ).click(() => {
  soundbox = false;
  console.log(soundbox);
});

$( '#startsong' ).click(() => {
  soundreader();
});

$( '#stopsong' ).click(() => {
  MIDI.Player.stop();
});

$( '#uname' ).change(() => {
  console.log('run');
  socket.emit('changename', $( '#uname' ).val() );
  $('.me .metaname').text($( '#uname' ).val());
});

const init = () => {

  MIDI.loadPlugin({
    soundfontUrl: './soundfont/',
    instrument: 'acoustic_grand_piano'
  });


  socket = io('http://localhost:3000');
  // socket = io('http://192.168.1.45:3000');

  socket.on('connect', client => {

    document.onkeydown = e => {
      // handle input
      let note = keyCodeToNote(e.keyCode);
      console.log(note);
      if (note !== -1 && !$('#uname').is(':focus')) {
        addCirkel();
        playNote(note);
        socket.emit('joined', note );
      }
    };
  });

  socket.on('join', note => {
    console.log(`pressed key: ${note}`);
    if(soundbox) {
      playNote(note);
      addCirkel();
    }
    console.log(soundbox);
  });

  socket.on('changename', name => {
    $('.stranger .metaname').text(name);
  });
};

//start draw circle
let canvas = document.getElementById('canvasbg');
let topcanvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
let ctxS = topcanvas.getContext('2d');

ctxS.fillStyle = '#000';
ctxS.rect(0, 0, canvas.width, canvas.height);
ctxS.fill();

window.addEventListener('resize', resizeCanvas, false);

const resizeCanvas = () => {
  topcanvas.width = canvas.width = window.innerWidth;
  topcanvas.height = canvas.height = window.innerHeight;
};

resizeCanvas();

let circles = [];

const addCirkel = () => {
  let colour = '#' + Math.floor(Math.random() * 16777215).toString(16); //16777215 is the decimal value of #FFFFFF
  let xval = Math.random() * canvas.width;
  let yval = Math.random() * canvas.height;

  circles.unshift({
    x: xval,
    y: yval,
    radius: 10,
    colour: colour,
    grow: true
  });
};

const circ = (x, y, rad, c) => {
  ctxS.fillStyle = c;
  ctxS.beginPath();
  ctxS.arc(x, y, rad, 0, 2 * Math.PI, false);
  ctxS.closePath();
  ctxS.fill();
};

const resetcanvas = () => {
  ctxS.fillStyle = '#000';
  ctxS.rect(0, 0, canvas.width, canvas.height);
  ctxS.fill();
};

const draw = () => {
  resetcanvas();
  for (let i = circles.length - 1; i >= 0; --i) {
    if(circles[i].radius < 100 && circles[i].radius > 0 && circles[i].grow) {
      circ(circles[i].x, circles[i].y, circles[i].radius +4, '#000');
      circ(circles[i].x, circles[i].y, circles[i].radius, circles[i].colour);
      circles[i].radius += 3;
    } else if (circles[i].radius > 0){
      circ(circles[i].x, circles[i].y, circles[i].radius +4, '#000');
      circ(circles[i].x, circles[i].y, circles[i].radius, circles[i].colour);
      circles[i].grow = false;
      circles[i].radius -= 3;
    } else {
      circles.splice(i, 1);
    }
  }

  ctx.drawImage(topcanvas, 0, 0);
  requestAnimationFrame(draw);
};

requestAnimationFrame(draw);
//stop cirkels

const playNote = (note) => {
  MIDI.noteOn(0, note, 127, 0);
  MIDI.noteOff(0, note, 0.75);
};

const soundreader = () => {
  MIDI.loadPlugin(function () {
    MIDI.Player.loadFile('midi/' + currentsong, MIDI.Player.start);
    MIDI.Player.timeWarp = 1.0;
    MIDI.Player.addListener(function(data) {
      var note = data.note;
      socket.emit('joined', note );
    });
  });
};

const keyCodeToNote = (keyCode) => {
  let note = -1;
  //-----------------------------------
  if(keyCode===90) note= 0; // C 0
  if(keyCode===83) note= 1; // C#0
  if(keyCode===88) note= 2; // D 0
  if(keyCode===68) note= 3; // D#0
  if(keyCode===67) note= 4; // E 0
  if(keyCode===86) note= 5; // F 0
  if(keyCode===71) note= 6; // F#0
  if(keyCode===66) note= 7; // G 0
  if(keyCode===72) note= 8; // G#0
  if(keyCode===78) note= 9; // A 0
  if(keyCode===74) note=10; // A#0
  if(keyCode===77) note=11; // B 0
  if(keyCode===188) note=12; // C 0

  //-----------------------------------
  if(keyCode===81) note=12; // C 1
  if(keyCode===50) note=13; // C#1
  if(keyCode===87) note=14; // D 1
  if(keyCode===51) note=15; // D#1
  if(keyCode===69) note=16; // E 1
  if(keyCode===82) note=17; // F 1
  if(keyCode===53) note=18; // F#1
  if(keyCode===84) note=19; // G 1
  if(keyCode===54) note=20; // G#1
  if(keyCode===89) note=21; // A 1
  if(keyCode===55) note=22; // A#1
  if(keyCode===85) note=23; // B 1
  //-----------------------------------
  if(keyCode===73) note=24; // C 2
  if(keyCode===57) note=25; // C#2
  if(keyCode===79) note=26; // D 2
  if(keyCode===48) note=27; // D#2
  if(keyCode===80) note=28; // E 2
  if(keyCode===219) note=29; // F 2
  if(keyCode===187) note=30; // F#2
  if(keyCode===221) note=31; // G 2
  //-----------------------------------

  if(note === -1) return -1;
  //OCTAAF OP 2
  return (note + 2*12);
};

init();
