var events       = require('events'),
    EventEmitter = events.EventEmitter,
    util         = require('util'),
    fs           = require('fs'),
    path         = require('path')
    moment       = require('moment');

function Log (app) {
  if(!app) throw 'Log requires your application as the first argument';

  EventEmitter.call(this);

  this.config = {};

  if(app.config) {
    this.config.log           = app.config.log || false;
    this.config.elasticSearch = app.config.elasticSearch;
  }

  if(this.config.elasticSearch) {
    this.elasticSearch = require('./elasticSearch');
  }

  var self = this;

  this.create = function (code, data) {
    if(!(typeof code === 'number')) {
      data = code;
      code = 0;
    }

    var timestamp = data.timestamp || new Date().getTime();
        timestamp = moment(timestamp).toISOString();

    data.timestamp = timestamp;

    var entry = {
      code      : code,
      data      : data,
      timestamp : timestamp
    };

    if(self.config.log) {
      fs.appendFile(path.join(process.cwd(), 'skynet.txt'), JSON.stringify(data) + '\r\n', function (error) {
        if(error) self.emit('error', error);
      });

      if(self.config.elasticSearch) {
        self.elasticSearch.index({
          index     : "log",
          type      : code,
          timestamp : data.timestamp,
          body      : data
        }, function (error, response) {
          if(error) {
            self.elasticSearch.emit('error', {error: error, data: data, entry: entry});
          } else {
            self.elasticSearch.emit('data', response);
            self.elasticSearch.emit('end');
          }
        });
      }

      self.emit('entry', entry);
      self.emit('end');
    }

  };

  return this;
}

util.inherits(Log, EventEmitter);

module.exports = Log;
