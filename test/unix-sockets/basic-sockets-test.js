/*
 * basic-sockets-test.js: Basic UNIX sockets tests
 *
 */

var vows = require('vows'),
    assert = require('assert'),
    Hook = require('../../lib/hookio').Hook,
    macros = require('../helpers/macros');

vows.describe('hook.io/unix-sockets/basic-sockets').addBatch({
  "When a hook is listening on /tmp/hook.sock": macros.assertListen('socket-listen', '/tmp/hook.sock', {
    "and another hook attempts to `.connect()`": macros.assertConnect('socket-connect', '/tmp/hook.sock'),
    "and another hook attempts to `.start()`": macros.assertReady('socket-start', '/tmp/hook.sock')
  })
}).addBatch({
  "When a hook is listening on /tmp/hook.sock": {
    "and another hook attempts to `.listen()` on /tmp/hook.sock": {
      topic: function () {
        var instance = new Hook({ name: 'socket-error' });
        instance.once('error::*', this.callback.bind(instance, null));
        instance.listen({ 'hook-socket': '/tmp/hook.sock' });
      },
      "it should fire the `error` event": function (_, data) {
        assert.equal(this.event, 'error::bind');
        assert.equal(data, '/tmp/hook.sock');
      }
    }
  }
}).addBatch({
  "When a hook is listening on /tmp/hook.sock": {
    "and another hook attempts to `.listen()` on /tmp/hook.sock": {
      topic: function () {
        var instance = new Hook({ name: 'socket-error-callback' });
        instance.listen({ 'hook-socket': '/tmp/hook.sock' }, this.callback.bind(instance, null));
      },
      "it should call back with an error": function (_, err) {
        assert.isObject(err);
      },
      "and the error should be EADDRINUSE": function (_, err) {
        assert.equal(err.code, 'EADDRINUSE');
      }
    }
  }
}).export(module);
