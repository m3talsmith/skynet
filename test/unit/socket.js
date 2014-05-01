var chai      = require('chai'),
    assert    = require('assert'),
    restify   = require('restify'),
    app       = {},
    WebSocket = require('../../lib/web-socket');

describe('webSocket', function () {
  it('listens to a server', function (done) {
    app.restify   = restify.createServer();
    var webSocket = new WebSocket(app);
    
    app.socket = webSocket.listen(app.restify);

    app.socket.on('listening', function () {
      console.log('socket listening');
      done();
    });

    app.restify.listen();
  });

  it('gets an ip', function (done) {
    app.restify   = restify.createServer();
    var webSocket = new WebSocket(app);

    app.socket = webSocket.listen(app.restify);

    app.socket.on('listening', function () {
      assert(app.socket.ip);
      assert(app.socket.ip === '127.0.0.1');
      done();
    });

    app.restify.listen(null, '127.0.0.1');
  });
  
  it('gets a port', function (done) {
    app.restify   = restify.createServer();
    var webSocket = new WebSocket(app);

    app.socket = webSocket.listen(app.restify);

    app.socket.on('listening', function () {
      assert(app.socket.port);
      assert(app.socket.port === 8080);
      done();
    });

    app.restify.listen(8080);
  });

  describe('sockets', function () {
    var webSocket = new WebSocket(app),
        ioclient  = require('socket.io-client');

    app.restify = restify.createServer();
    app.socket  = webSocket.listen(app.restify);

    /*
    if(namespace instanceof Object) {
      options   = namespace;
      delete namespace;
    }

    var address = server.address(),
        url     = [ 'ws://', address.address,
          ':', address.port, (namespace || '') ].join();
    
    return ioclient(url, options);
     */

    describe('on', function () {
      describe('connection', function () {
        /*
        beforeEach(function () {
          app.socket.sockets.on('connection', function (socket) {
            app.socket.setup(socket);
          });
        });
        */

        /*
        it('has an ip address', function (done) {
          app.socket.on('listening', function () {
            var incoming = client(app.socket, ioclient);
            assert(incoming.ip);
            assert(incoming.ip === app.socket.ip);
            done();
          });

          app.restify.listen();
        });
        */

        it('logs the event');

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
