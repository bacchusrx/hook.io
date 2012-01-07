/*
 * test-basic-test.js: Basic tests for the hook.io module
 *
 * (C) 2011 Marak Squires, Charlie Robbins
 * MIT LICENCE
 *
 */

var vows = require('vows'),
    assert = require('assert'),
    Hook = require('../../lib/hookio').Hook,
    macros = require('../helpers/macros');

vows.describe('hook.io/unix-sockets/spawn-sockets').addBatch({
  "When a hook is listening on a /tmp/spawn1.sock": macros.assertListen('socket-host1', '/tmp/spawn1.sock', {
    "and we ask it to be local and begin spawning": macros.assertHelloWorld(true)
  }),
  "When a hook is listening on a /tmp/spawn2.sock": macros.assertListen('socket-host2', '/tmp/spawn2.sock', {
    "and we ask it to spawn some children (out of process)" : macros.assertHelloWorld()
  })
}).export(module);
