var Socket = require('socket.io');

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
    server.setupIncomingSocket(socket);
    var roomClient = server.sockets.manager.roomClients[socket.id];
    roomClient.ip   = socket.ip;
    roomClient.port = socket.port;

    server.sockets.manager.roomClients[socket.id] = roomClient;
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
