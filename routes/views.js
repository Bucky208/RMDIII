'use strict';

module.exports = [

  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => reply.view('index', {
      name: 'Maxim De Groote',
      title: 'Audioworld'
    })
  },

  {
    method: 'GET',
    path: '/piano',
    handler: (request, reply) => reply.view('piano')
  }

];
