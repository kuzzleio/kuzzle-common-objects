'use strict';

const assert = require('../utils/assertType');

// private properties
const
  _connectionId = Symbol(),
  _protocol = Symbol(),
  _headers = Symbol(),
  _token = Symbol(),
  _user = Symbol();

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
 * @name RequestContext#headers
 * @type {object}
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


    this[_connectionId] = null;
    this[_protocol] = null;
    this[_headers] = null;
    this[_token] = null;
    this[_user] = null;

    Object.seal(this);

    this.connectionId = options.connectionId;
    this.protocol = options.protocol;
    this.headers = options.headers;
    this.token = options.token;
    this.user = options.user;
  }

  toJSON() {
    return {
      connectionId: this[_connectionId],
      protocol: this[_protocol],
      headers: this[_headers],
      user: this[_user],
      token: this[_token]
    };
  }

  /**
   * Context connectionId getter
   * @returns {null|string}
   */
  get connectionId () {
    return this[_connectionId];
  }

  /**
   * Context connectionId setter
   * @param {null|string} str - new context connectionId
   */
  set connectionId (str) {
    this[_connectionId] = assert.assertString('connectionId', str);
  }

  /**
   * Context protocol getter
   * @returns {null|string}
   */
  get protocol () {
    return this[_protocol];
  }

  /**
   * Context protocol setter
   * @param {null|string} str - new context protocol
   */
  set protocol (str) {
    this[_protocol] = assert.assertString('protocol', str);
  }

  /**
   * Context headers getter
   * @returns {null|object}
   */
  get headers () {
    return this[_headers];
  }

  /**
   * Context headers setter
   * @param {null|object} obj - new context headers
   */
  set headers (obj) {
    this[_headers] = assert.assertObject('headers', obj);
  }

  /**
   * Context token getter
   * @returns {null|object}
   */
  get token () {
    return this[_token];
  }

  /**
   * Context token setter
   * @param {null|object} obj - new context token
   */
  set token (obj) {
    this[_token] = assert.assertObject('token', obj);
  }

  /**
   * Context user getter
   * @returns {null|object}
   */
  get user () {
    return this[_user];
  }

  /**
   * Context user setter
   * @param {null|object} obj - new context user
   */
  set user (obj) {
    this[_user] = assert.assertObject('user', obj);
  }
}

/**
 * @type {RequestContext}
 */
module.exports = RequestContext;
