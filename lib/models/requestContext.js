'use strict';

/**
 * @constructor
 * @class
 * @property {string} connectionId
 * @property {string} protocol
 * @property {string} token
 * @property {object} user
 */
class RequestContext {
  constructor() {
    this.connectionId = null;
    this.protocol = null;
    this.token = null;
    this.user = null;
  }
}

/**
 * @type {RequestContext}
 */
module.exports = RequestContext;
