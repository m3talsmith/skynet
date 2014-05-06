var config = require('./../config');
var log    = new require('./log')({config: config});
var events = require('./database').collection('events');
var fs     = require('fs');
var client = require('./elasticSearch');
var moment = require('moment');

module.exports = function(eventCode, data) {

  // add timestamp if one isn't passed
  if (data && !data.hasOwnProperty("timestamp")){
    var newTimestamp = new Date().getTime();
    data.timestamp = newTimestamp;
  }
  // moment().toISOString()
  data.timestamp = moment(data.timestamp).toISOString()


  if(eventCode === undefined){
    eventCode = 0;
  }
  data.eventCode = eventCode;

  log.create(data.eventCode, data);
  log.on('error', function (error) { throw error; });
  log.on('end',   function () { console.log('Log file updated'); });

  if(log.elasticSearch) {
    log.elasticSearch.on('error', function (error) {
      console.log(error);
      console.log(data);
    });

    log.elasticSearch.on('data', function (response) { console.log(response); });
    log.elasticSearch.on('end', function () { console.log('logged to elastic search'); });
  }

  events.save(data, function(err, saved) {
    if(err || saved.length < 1) {
      console.log('Error logging event: ' + JSON.stringify(data));
      console.log('Error: ' + err);
    } else {
      console.log('Event Loggged: ' + JSON.stringify(data));
    }

  });
};
