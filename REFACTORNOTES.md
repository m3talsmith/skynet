Refactoring
===========

The goal is to have one app that acts as a hub for all the rest of the pieces; rather than jamming everything in the ```server.js```.

``` javascript
app = {
  config    : {},
  database  : {},
  log       : {},
  broker    : {},
  socket    : {},
  mqtt      : {},
  rest      : {},
  coap      : {},
  protocols : ['rest', 'coap', 'mqtt', 'socket'],
  throttles : {},
  errors    : {},
  hooks     : [],
  routes    : [],
  sockets   : []
};
```

We also need to break out the lib directory in sub directories of responsibility; meaning, put a database dir that contains db specific calls, etc.

Testing
-------

1. Set up a harness in mocha
1. Unit test lib files

Refactoring to middleware model
-------------------------------

In order to keep the complexity and length of server.js down, and to
improve reuse, we are migrating this to a middleware model.

Usage
-----

First we set up skynet and attach our middleware:

``` javascript
var socket = require('./lib/web-socket'),
    config = require('./config'),
    log    = require('./lib/log'),
    skynet = require('./lib/skynet');

skynet
  .use(config)
  .use(log)
  .use(socket);
```

Then we can spin up our listeners with:

``` javascript
skynet.listen();
```

This will start all registered services added as middleware on their
configured ports.

