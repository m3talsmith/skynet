var chai      = require('chai'),
    assert    = require('assert'),
    webSocket = require('../../lib/web-socket');

describe('webSocket', function () {
  it('listens to a http server');

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
