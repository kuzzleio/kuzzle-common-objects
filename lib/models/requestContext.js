'use strict';

const assert = require('../utils/assertType');

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
 * @type {string}
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
  constructor(_options) {
    let options = _options || {};

    this._connectionId = null;
    this._protocol = null;
    this._token = null;
    this._user = null;

    Object.seal(this);

    this.connectionId = options.connectionId;
    this.protocol = options.protocol;
    this.token = options.token;
    this.user = options.user;
  }

  toJSON() {
    let json = {};

    Object.keys(this)
      .filter(key => key[0] === '_')
      .forEach(key => {
        json[key.substring(1)] = this[key];
      });

    return json;
  }

  get connectionId () {
    return this._connectionId;
  }

  set connectionId (str) {
    this._connectionId = assert.assertString('connectionId', str);
  }

  get protocol () {
    return this._protocol;
  }

  set protocol (str) {
    this._protocol = assert.assertString('protocol', str);
  }

  get token () {
    return this._token;
  }

  set token (obj) {
    this._token = assert.assertObject('token', obj);
  }

  get user () {
    return this._user;
  }

  set user (obj) {
    this._user = assert.assertObject('user', obj);
  }
}

/**
 * @type {RequestContext}
 */
module.exports = RequestContext;
