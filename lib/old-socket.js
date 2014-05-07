var socketio = require('socket.io'),
    redis    = require('./lib/redis');

function Socket (app, server, https_server, mqtt) {
  if(!app.socket) app.socket = this;

  var io = socketio.listen(server);
  if(app.config.redis){
    io.configure(function() {
      return io.set("store", redis.createIoStore());
    });
  }
  app.socket.server = io;

  if(app.config.tls){
    var ios = socketio.listen(https_server);
    app.socket.secureServer = ios;
  
    /* TODO: Figure out why secure socket.io doesn't log to REDIS
     * if(app.config.redis){
     *   ios.configure(function() {
     *     return ios.set("store", redis.createIoStore());
     *   });
     * };
     */
  }

  app.socket.sendToSocket = function (device, msg, callback) {
    var socketServer = device.secure ? app.socket.secureServer : app.socket.server;

    if(socketServer){
      if(callback){
        socketServer.sockets.socket(device.socketid).emit('message', msg, function(results){
          app.log.create(e);
          console.log('results', results);
          try{
            callback(results);
          } catch (e){
            app.log.create(e);
            console.log(e);
          }
        });
      }else{
        socketServer.sockets.in(device.uuid).emit('message', msg);
      }
    }
  };
}

module.exports = Socket;
