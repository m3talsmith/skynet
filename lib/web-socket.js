var socket = require('socket.io');

module.exports = function (app) {
  var instance = {
    listen: function (provider, callback) {
      app.socket = socket.listen(provider);

      if(callback) callback(app.socket);
      return app.socket;
    }
  };

  return instance;
};
