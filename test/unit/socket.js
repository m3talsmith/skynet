var chai      = require('chai'),
    assert    = require('assert'),
    restify   = require('restify'),
    ioclient  = require('socket.io-client'),
    WebSocket = require('../../lib/web-socket');

function initializeApp () {
  var app       = {},
      webSocket = new WebSocket(app);

  app.restify = restify.createServer();
  app.socket  = webSocket.listen(app.restify);
  
  return app;
}

describe('webSocket', function () {
  it('listens to a server', function (done) {
    var app = initializeApp();

    app.socket.on('listening', function () {
      done();
    });

    app.restify.listen();
  });

  it('gets an ip', function (done) {
    var app = initializeApp();

    app.socket.on('listening', function () {
      assert(app.socket.ip);
      assert(app.socket.ip === '127.0.0.1');
      done();
    });

    app.restify.listen(null, '127.0.0.1');
  });
  
  it('gets a port', function (done) {
    var app = initializeApp();

    app.socket.on('listening', function () {
      assert(app.socket.port);
      assert(app.socket.port === 8080);
      done();
    });

    app.restify.listen(8080);
  });

  describe('sockets', function () {
    describe('on', function () {
      describe('connection', function () {
        it('adds new socket', function (done) {
          var app = initializeApp();

          app.socket.on('listening', function () {
            var client = ioclient.connect(
              'ws://' + app.socket.ip + ':' + app.socket.port
            );

            client.on('connect', function () {
              assert(app.socket.roomClients[
                client.socket.sessionid
              ]);

              done();
            });
          });

          app.restify.listen();
        });

        it('has an ip address', function (done) {
          var app = initializeApp();

          app.socket.on('listening', function () {
            assert(!app.socket.roomClients.length);

            var client = ioclient.connect(
              'ws://' + app.socket.ip + ':' + app.socket.port
            );

            client.on('connect', function () {
              var roomClient = app.socket.roomClients[
                client.socket.sessionid
              ];

              assert(roomClient.ip);
              done();
            });
          });

          app.restify.listen();
        });

        it('logs the event', function (done) {
          var app = initializeApp();

          app.socket.on('listening', function () {
            var client = ioclient.connect(
              'ws://' + app.socket.ip + ':' + app.socket.port
            );
          });

          app.socket.on('eventLogged', function () {
            done();
          });

          app.restify.listen();
        });

        describe('rate limit', function () {
          it('not exceeded');
          it('exceeded');
        });

        it('mounts event listeners');
      });
    });

    describe('socket', function () {
      describe('emit', function () {
        it('message');
        it('notReady');
        it('identify');
        it('ready');
        it('bindSocket');
      });

      describe('on', function () {
        it('identity');
        it('disconnect');
        it('subscribe');
        it('unsubscribe');
        it('devices');
        it('whoami');
        it('bindSocket');
        it('register');
        it('update');
        it('unregister');
        it('events');
        it('authenticate');
        it('data');
        it('message');
        it('gatewayConfig');
      });
    });
  });
});
