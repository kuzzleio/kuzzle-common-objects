'use strict';

/**
 * @constructor
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
