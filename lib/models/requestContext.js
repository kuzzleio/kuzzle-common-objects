'use strict';

const assert = require('../utils/assertType');

// Private variables
let
  _connectionId = new WeakMap(),
  _protocol = new WeakMap(),
  _token = new WeakMap(),
  _user = new WeakMap();

/**
 * @class
 * @param {object} [options]
 */
/**
 * @name RequestContext#connectionId
 * @type {string}
 */
/**
 * @name RequestContext#protocol
 * @type {protocol}
 */
/**
 * @name RequestContext#token
 * @type {object}
 */
/**
 * @name RequestContext#user
 * @type {object}
 */
class RequestContext {
  constructor(options) {
    options = options || {};

    Object.defineProperties(this, {
      connectionId: {
        get: function () { return _connectionId.get(this); },
        set: function (str) { _connectionId.set(this, assert.assertString('connectionId', str));},
        enumerable: true
      },
      protocol: {
        get: function () { return _protocol.get(this); },
        set: function (str) { _protocol.set(this, assert.assertString('protocol', str)); },
        enumerable: true
      },
      token: {
        get: function () { return _token.get(this); },
        set: function (obj) { _token.set(this, assert.assertObject('token', obj)); },
        enumerable: true
      },
      user: {
        get: function () { return _user.get(this); },
        set: function (obj) { _user.set(this, assert.assertObject('user', obj)); },
        enumerable: true
      }
    });

    Object.seal(this);

    this.connectionId = options.connectionId;
    this.protocol = options.protocol;
    this.token = options.token;
    this.user = options.user;
  }
}

/**
 * @type {RequestContext}
 */
module.exports = RequestContext;
