var Socket = require('socket.io'),
    config = require('./../config'),
    Log    = require('./log');

function WebSocket (app) {
  var instance = {
    listen: listen
  };

  return instance;
}

function listen (provider) {
  var server = Socket.listen(provider);

  server.setupIncomingSocket = setupIncomingSocket;
  server.sockets.on('connection', function (socket) {
    var log = new Log({config: config});

    log.on('error', function (error) { server.emit('error', error); });
    log.on('end',   function () { server.emit('logged'); });
    log.create({socket: socket.id});
  });

  provider.on('listening', function () {
    var address = provider.server.address();

    if(address) {
      server.ip   = address.address;
      server.port = address.port;
    }

    server.emit('listening');
  });
  
  return server;
}

function setupIncomingSocket (socket) {
  socket.ip = socket.handshake.address.address;
  return socket;
}

module.exports = WebSocket;
