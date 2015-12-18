/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("__webpack_require__(1);\nmodule.exports = __webpack_require__(2);\n\n\n/*****************\n ** WEBPACK FOOTER\n ** multi main\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///multi_main?");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("'use strict';\n\n// some features need the be polyfilled..\n// https://babeljs.io/docs/usage/polyfill/\n\n// import 'babel-core/polyfill';\n// or import specific polyfills\n// import {$} from './helpers/util';\n\n//import Player from './modules/Player';\n\nvar socket = undefined;\nvar soundbox = true;\nvar record = false;\nvar currentsong = 'game_of_thrones.mid';\nvar timeoutplay = undefined;\n$('#currentsong').text(currentsong);\n\n$('#demo').click(function () {\n  socket.emit('joined', 50);\n});\n\n$('#soundbox').click(function () {\n  soundbox = true;\n  console.log(soundbox);\n});\n\n$('#piano').click(function () {\n  soundbox = false;\n  console.log(soundbox);\n});\n\n$('#startsong').click(function () {\n  soundreader();\n});\n\n$('#stopsong').click(function () {\n  MIDI.Player.stop();\n});\n\n$('#startrecord').click(function () {\n  starttimer();\n  console.log('timer gestart');\n  record = true;\n});\n\n$('#stoprecord').click(function () {\n  stoptimer();\n  record = false;\n  $('#recordcontrols').hide();\n});\n\n$('#playrecord').click(function () {\n  playarray();\n  timeoutplay = setInterval(playarray, 10);\n  time = 0;\n  updaternotes = setInterval(timer, 100);\n});\n\n$('#reload').click(function () {\n  location.reload();\n});\n\n$('#uname').change(function () {\n  console.log('run');\n  socket.emit('changename', $('#uname').val());\n  $('.me .metaname').text($('#uname').val());\n});\n\nvar init = function init() {\n\n  MIDI.loadPlugin({\n    soundfontUrl: './soundfont/',\n    instrument: 'acoustic_grand_piano'\n  });\n\n  socket = io('http://rmdiii.herokuapp.com');\n  //rgsfusdfsd socket = io('http://192.168.1.45:3000');\n\n  socket.on('connect', function (client) {\n\n    document.onkeydown = function (e) {\n      // handle input\n      var note = keyCodeToNote(e.keyCode);\n      console.log(note);\n      if (note !== -1 && !$('#uname').is(':focus')) {\n        addCirkel();\n        playNote(note);\n        socket.emit('joined', note);\n      }\n    };\n  });\n\n  socket.on('join', function (note) {\n    console.log('pressed key: ' + note);\n    if (soundbox) {\n      playNote(note);\n      addCirkel();\n    }\n    console.log(soundbox);\n  });\n\n  socket.on('changename', function (name) {\n    $('.stranger .metaname').text(name);\n  });\n};\n\n//start draw circle\nvar canvas = document.getElementById('canvasbg');\nvar topcanvas = document.createElement('canvas');\nvar ctx = canvas.getContext('2d');\nvar ctxS = topcanvas.getContext('2d');\n\nctxS.fillStyle = '#000';\nctxS.rect(0, 0, canvas.width, canvas.height);\nctxS.fill();\n\nwindow.addEventListener('resize', resizeCanvas, false);\n\nvar resizeCanvas = function resizeCanvas() {\n  topcanvas.width = canvas.width = window.innerWidth;\n  topcanvas.height = canvas.height = window.innerHeight;\n};\n\nresizeCanvas();\n\nvar circles = [];\n\nvar addCirkel = function addCirkel() {\n  var colour = '#' + Math.floor(Math.random() * 16777215).toString(16); //16777215 is the decimal value of #FFFFFF\n  var xval = Math.random() * canvas.width;\n  var yval = Math.random() * canvas.height;\n\n  circles.unshift({\n    x: xval,\n    y: yval,\n    radius: 10,\n    colour: colour,\n    grow: true\n  });\n};\n\nvar circ = function circ(x, y, rad, c) {\n  ctxS.fillStyle = c;\n  ctxS.beginPath();\n  ctxS.arc(x, y, rad, 0, 2 * Math.PI, false);\n  ctxS.closePath();\n  ctxS.fill();\n};\n\nvar resetcanvas = function resetcanvas() {\n  ctxS.fillStyle = '#000';\n  ctxS.rect(0, 0, canvas.width, canvas.height);\n  ctxS.fill();\n};\n\nvar draw = function draw() {\n  resetcanvas();\n  for (var i = circles.length - 1; i >= 0; --i) {\n    if (circles[i].radius < 100 && circles[i].radius > 0 && circles[i].grow) {\n      circ(circles[i].x, circles[i].y, circles[i].radius + 4, '#000');\n      circ(circles[i].x, circles[i].y, circles[i].radius, circles[i].colour);\n      circles[i].radius += 3;\n    } else if (circles[i].radius > 0) {\n      circ(circles[i].x, circles[i].y, circles[i].radius + 4, '#000');\n      circ(circles[i].x, circles[i].y, circles[i].radius, circles[i].colour);\n      circles[i].grow = false;\n      circles[i].radius -= 3;\n    } else {\n      circles.splice(i, 1);\n    }\n  }\n\n  ctx.drawImage(topcanvas, 0, 0);\n  requestAnimationFrame(draw);\n};\n\nrequestAnimationFrame(draw);\n//stop cirkels\n\nvar time = 0;\nvar updaternotes = undefined;\nvar currentnote = 1;\nvar currentomgekeerdenote = undefined;\nvar starttimer = function starttimer() {\n  time = 0;\n  updaternotes = setInterval(timer, 100);\n};\n\nvar stoptimer = function stoptimer() {\n  clearInterval(updaternotes);\n  console.log(noten);\n  $('#eigensongcontrol').show();\n};\n\nvar timer = function timer() {\n  time++;\n};\n\nvar noten = [];\n\nvar addNote = function addNote(note) {\n  noten.unshift({\n    noot: note,\n    time: time\n  });\n};\n\nvar playarray = function playarray() {\n  currentomgekeerdenote = noten.length - currentnote;\n\n  if (noten[currentomgekeerdenote].time === time) {\n    playNote(noten[currentomgekeerdenote].noot);\n    addCirkel();\n    currentnote++;\n  }\n  if (noten.length === currentnote - 1) {\n    clearInterval(timeoutplay);\n    time = 0;\n  }\n};\n\nvar playNote = function playNote(note) {\n  if (record) {\n    addNote(note);\n  }\n  MIDI.noteOn(0, note, 127, 0);\n  MIDI.noteOff(0, note, 0.5);\n};\n\nvar soundreader = function soundreader() {\n  MIDI.loadPlugin(function () {\n    MIDI.Player.loadFile('midi/' + currentsong, MIDI.Player.start);\n    MIDI.Player.timeWarp = 1.0;\n    MIDI.Player.addListener(function (data) {\n      var note = data.note;\n      socket.emit('joined', note);\n    });\n  });\n};\n\nvar keyCodeToNote = function keyCodeToNote(keyCode) {\n  var note = -1;\n  //-----------------------------------\n  if (keyCode === 90) note = 0; // C 0\n  if (keyCode === 83) note = 1; // C#0\n  if (keyCode === 88) note = 2; // D 0\n  if (keyCode === 68) note = 3; // D#0\n  if (keyCode === 67) note = 4; // E 0\n  if (keyCode === 86) note = 5; // F 0\n  if (keyCode === 71) note = 6; // F#0\n  if (keyCode === 66) note = 7; // G 0\n  if (keyCode === 72) note = 8; // G#0\n  if (keyCode === 78) note = 9; // A 0\n  if (keyCode === 74) note = 10; // A#0\n  if (keyCode === 77) note = 11; // B 0\n  if (keyCode === 188) note = 12; // C 0\n\n  //-----------------------------------\n  if (keyCode === 81) note = 12; // C 1\n  if (keyCode === 50) note = 13; // C#1\n  if (keyCode === 87) note = 14; // D 1\n  if (keyCode === 51) note = 15; // D#1\n  if (keyCode === 69) note = 16; // E 1\n  if (keyCode === 82) note = 17; // F 1\n  if (keyCode === 53) note = 18; // F#1\n  if (keyCode === 84) note = 19; // G 1\n  if (keyCode === 54) note = 20; // G#1\n  if (keyCode === 89) note = 21; // A 1\n  if (keyCode === 55) note = 22; // A#1\n  if (keyCode === 85) note = 23; // B 1\n  //-----------------------------------\n  if (keyCode === 73) note = 24; // C 2\n  if (keyCode === 57) note = 25; // C#2\n  if (keyCode === 79) note = 26; // D 2\n  if (keyCode === 48) note = 27; // D#2\n  if (keyCode === 80) note = 28; // E 2\n  if (keyCode === 219) note = 29; // F 2\n  if (keyCode === 187) note = 30; // F#2\n  if (keyCode === 221) note = 31; // G 2\n  //-----------------------------------\n\n  if (note === -1) return -1;\n  //OCTAAF OP 2\n  return note + 2 * 12;\n};\n\ninit();\n\n/*****************\n ** WEBPACK FOOTER\n ** ./_js/script.js\n ** module id = 1\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./_js/script.js?");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("// removed by extract-text-webpack-plugin\n\n/*****************\n ** WEBPACK FOOTER\n ** ./_scss/style.scss\n ** module id = 2\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./_scss/style.scss?");

/***/ }
/******/ ]);