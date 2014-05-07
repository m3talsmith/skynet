var events = require('events'),
    util   = require('util'),
    config = require('../config');

function Skynet () {
  events.EventEmitter.call(this);

  var self = this;

  this.use = function (middleware) {
    if(!middleware) throw 'MiddlewareError: Requires at least one argument';
    if(!(middleware instanceof Function)) throw 'MiddlewareError: The first argument must be a function';

    if(!self.middleware) self.middleware = [];

    var entry = {
      callback: middleware,
      arguments: Array.prototype.slice.call(arguments, 1)
    };

    self.middleware.push(entry);
    return self;
  };

  this.listen = function () {
    self.middleware.forEach(function (current) {
      var callback = current.callback;
      var args     = [self].concat(current.arguments);
      callback.apply( callback, args );
    });
  };
}

util.inherits(Skynet, events.EventEmitter);

var skynet = new Skynet();

module.exports = skynet;
