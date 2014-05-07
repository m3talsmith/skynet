var mocha  = require('mocha'),
    assert = require('assert'),
    path   = require('path');

describe('skynet', function () {
  describe('#use', function () {
    var skynet;

    beforeEach(function () {
      skynet = require('../../lib/skynet');
    });

    afterEach(function () {
      delete require.cache[path.join(process.cwd(), 'lib', 'skynet.js')];
    });

    it('requires an argument', function (done) {
      try {
        skynet.use();
        done(new Error('MiddlewareError not thrown'));
      } catch (e) {
        assert(e === 'MiddlewareError: Requires at least one argument');
        done();
      }
    });

    it('requires the first argument to be a function', function (done) {
      try {
        skynet.use(1);
        done(new Error('MiddlewareError not thrown'));
      } catch (e) {
        assert(e === 'MiddlewareError: The first argument must be a function');
        done();
      }
    });

    it('adds the function to the middleware stack', function () {
      var testMiddleware = function (app) {
        console.log('hello from middleware', app);
      };

      assert(!skynet.middleware);

      skynet.use(testMiddleware);

      assert(skynet.middleware);
      assert(skynet.middleware[0].callback.toString() === testMiddleware.toString());
    });

    it('returns self to allow chaining', function () {
      var response = skynet.use(function (app) {});
      assert(response);
      assert(response.use);
      assert(response === skynet);
    });

    it('stores additional arguments passed with the function', function () {
      var testMiddleware = function (app, message, options) {console.log(app, message, options);},
          args           = ['hello arguments', {hello: 'arguments'}];

      skynet.use(testMiddleware, args[0], args[1]);
      var middleware = skynet.middleware[0];

      assert(middleware.callback.toString() === testMiddleware.toString());
      assert(middleware.arguments.length === args.length);
      assert(middleware.arguments[0] === args[0]);
      assert(JSON.stringify(middleware.arguments[1]) === JSON.stringify(args[1]));
    });
  });

  describe('#listen', function () {
    it('emits listening to all middleware');
    it('accepts options');
    describe('options', function () {
      it('provide alternative port for middleware listen');
      it('provide alternative host for middleware listen');
      it('provide alternative callback for middleware listen');
    });
  });
});
