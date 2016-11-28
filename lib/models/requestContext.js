'use strict';

const assert = require('../utils/assertType');

/**
 * @constructor
 * @class
 * @property {string} connectionId
 * @property {string} protocol
 * @property {string} token
 * @property {object} user
 *
 * @param {object} [options]
 */
class RequestContext {
  constructor(options) {
    options = options || {};

    this.connectionId = assert.assertString('connectionId', options.connectionId);
    this.protocol = assert.assertString('protocol', options.protocol);
    this.token = assert.assertString('token', options.token);
    this.user = assert.assertObject('user', options.user);
  }
}

/**
 * @type {RequestContext}
 */
module.exports = RequestContext;
