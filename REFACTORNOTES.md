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
