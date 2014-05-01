var chai      = require('chai'),
    assert    = require('assert'),
    app       = {},
    WebSocket = require('../../lib/web-socket');

describe('webSocket', function () {
  it('listens to a server', function (done) {
    app.restify = require('restify').createServer();
    var webSocket = new WebSocket(app);
    
    webSocket.listen(app.restify, function (server) { 
      assert(server instanceof Object);
      assert(server.server);
      assert(server.server instanceof Object);
      assert(app.socket);
      assert(app.socket == server);

      done();
    });
  });

  describe('sockets', function () {
    describe('on', function () {
      it('connection');
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
