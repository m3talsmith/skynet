var socket = require('socket.io');

function WebSocket (app) {
  var instance = {
    listen: listen
  };

  return instance;
}

function listen (provider) {
  var server = socket.listen(provider);

  server.setup = setupIncomingSocket;

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

function setupIncomingSocket (incomingSocket) {
  debugger;
  incomingSocket.ip   = this.ip;
  incomingSocket.port = this.port;

  return incomingSocket;
}

module.exports = WebSocket;
