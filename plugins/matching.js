'use strict';

module.exports.register = (server, options, next) => {

// error weg dat socket io niet kan ingeladen worden door dit. socket.io word ingeladen op de server nu
  let io = require('socket.io')(server.listener);

// aangelang van de status die je stuurt naar de server, krijg je andere response. bv status searching => search op server
// in models map steek je een status model. model inlezen in client en server!
  let Status = require('../models/Status');

// hier kleine letters is gewoon een object geen constructor enzo, grote letter start is constructor, functies enzo
  let client = require('../models/client');

  let clients = [];

  const search = (you, socket) => {

    if (you === undefined || you.status !== Status.searching) return;

    let list = clients.filter(
      c => c.socketId !== you.socketId && c.status === Status.searching
    );

    if (list.length === 0) {
      setTimeout(search, 2000, you, socket);

    } else {

      let stranger = list[Math.round(Math.random() * (list.length-1))];
      you.status = Status.paired;
      stranger.status = Status.paired;
      socket.emit('found', stranger.peerId);
    }

  };


  io.on('connection', socket => {
// object.create en object.assign => dit is mijn object object.create is kopieen van eerste object. Anders was het ja functie zit daar in en je paste dat direct toe aan elk object.
// object.assign is objecten samenzetten om 1 groot object te maken. Prototypal enharitance.
    socket.on('joined', data => {
      socket.broadcast.emit('join', data);
    });

    socket.on('changename', data => {
      socket.broadcast.emit('changename', data);
    });

    // let newClient = Object.assign({}, client);
    // newClient.socketId = socket.id;

    // clients.push(newClient);

    // socket.on('disconnect', () => {
    //   clients = clients.filter(
    //     c => c.socketId !== socket.id
    //   );
    // });

    // socket.on('peerId', peerId => {
    //   console.log(peerId);
    //   newClient.peerId = peerId;
    // });


    // socket.on('status', status => {
    //   // zelfde als if maar dan gewoon gaat die gewoon door
    //   if (newClient.status === status) return;

    //   newClient.status = status;

    //   if (newClient.status === Status.searching) {
    //     search(newClient, socket);
    //   }

    // });

  });

  next();

};


module.exports.register.attributes = {
  name: 'helloplugin',
  version: '0.1.0'
};
