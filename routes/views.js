'use strict';

module.exports = [

  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => reply.view('index', {
      name: 'Emiel Van Betsbrugge en Maxim De Groote',
      title: 'MidiRecorder'
    })

  }

];
