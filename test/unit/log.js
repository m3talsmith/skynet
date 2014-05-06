var chai   = require('chai'),
    assert = require('assert'),
    fs     = require('fs'),
    path   = require('path'),
    events = require('events'),
    util   = require('util'),
    Log    = require('../../lib/log');

describe('Log', function () {
  describe('new', function () {
    it('requires app to be passed as the argument', function (done) {
      var app = {},
          log;
      
      try {
        log = new Log();
      }
      catch (error) {
        assert.equal('Log requires your application as the first argument', error);

        log = new Log(app);
        done();
      }
    });

    it('sets config from app.config', function () {
      var app = {config: {log: true}},
          log = new Log(app);

      assert(log.config instanceof Object);
      assert(log.config.log);
    });
  });

  describe('#create(code, message)', function () {
    it('defaults code to 0 if not provided', function (done) {
      var app     = {config: {log: true}},
          log     = new Log(app),
          message = {"hello":"world"},
          code    = 0;

      log.on('entry', function (entry) {
        assert(entry.code    === code);
        assert(entry.data === message);
        done();
      });

      log.create(message);
    });

    it('creates a skynet.txt log entry if config.log is true', function (done) {
      var app     = {config: {log: true}},
          log     = new Log(app),
          message = {"hello":"world"};

      log.on('entry', function (entry) {
        assert(entry.data === message);
        done();
      });

      log.create(message);
    });
    
    it('creates an elastic search log entry if config.elasticSearch exists', function (done) {
      var app = {
        config: {
          log: true,
          elasticSearch: {
            host: 'localhost',
            port: 8000
          }
        }
      };

      var log     = new Log(app),
          code    = 100,
          message = {"hello":"world"};

      function ElasticSearch () {
        events.EventEmitter.call(this);

        var self = this;

        this.index = function (options, callback) {
          callback(null, 'roger');
        };
      };

      util.inherits(ElasticSearch, events.EventEmitter);

      log.elasticSearch = new ElasticSearch();

      log.on('entry', function (entry) {
        assert(entry.code === code);
        assert(entry.data === message);
      });

      log.elasticSearch.on('data', function (data) {
        assert(data === 'roger');
      });

      log.elasticSearch.on('end', function () {
        done();
      });

      log.create(code, message);
    });
  });
});
