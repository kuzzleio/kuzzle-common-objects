'use strict';

const assert = require('../utils/assertType');

// private properties
const
  _token = Symbol(),
  _user = Symbol(),
  _connection = Symbol(),
  // Connection class properties
  _c_id = Symbol(),
  _c_protocol = Symbol(),
  _c_ips = Symbol(),
  _c_misc = Symbol();

/**
 * @class Connection information
 */
/**
 * @name id
 * @type {string}
 */
/**
 * @name protocol
 * @type {string}
 */
/**
 * @name ips
 * @type {Array}
 */
/**
 * @name misc
 * @type {object}
 */
class Connection {
  constructor(connection = {}) {
    this[_c_id] = null;
    this[_c_protocol] = null;
    this[_c_ips] = [];
    this[_c_misc] = {};

    Object.seal(this);

    for (const prop of Object.keys(connection)) {
      if (['id', 'protocol', 'ips'].includes(prop)) {
        this[prop] = connection[prop];
      } else {
        this.misc[prop] = connection[prop];
      }
    }
  }

  set id(str) {
    if (this[_c_id] === null) {
      this[_c_id] = assert.assertString('connection.id', str);
    }
  }

  get id() {
    return this[_c_id];
  }

  set protocol(str) {
    if (this[_c_protocol] === null) {
      this[_c_protocol] = assert.assertString('connection.protocol', str);
    }
  }

  get protocol() {
    return this[_c_protocol];
  }

  set ips(arr) {
    this[_c_ips] = assert.assertArray('connection.ips', arr, 'string');
  }

  get ips() {
    return this[_c_ips];
  }

  get misc() {
    return this[_c_misc];
  }

  toJSON() {
    return Object.assign({
      id: this[_c_id],
      protocol: this[_c_protocol],
      ips: this[_c_ips]
    }, this[_c_misc]);
  }
}

/**
 * @class
 * @param {object} [options]
 */
/**
 * @deprecated use connection.id instead
 * @name RequestContext#connectionId
 * @type {string}
 */
/**
 * @deprecated use connection.protocol instead
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
/**
 * @name  RequestContext#connection
 * @type {Connection}
 */
class RequestContext {
  constructor(options = {}) {

    this[_token] = null;
    this[_user] = null;
    this[_connection] = new Connection(options.connection);

    Object.seal(this);

    this.token = options.token;
    this.user = options.user;

    // retro-compatibility
    this.connectionId = options.connectionId;
    this.protocol = options.protocol;
  }

  toJSON() {
    return {
      user: this[_user],
      token: this[_token],
      connection: this[_connection].toJSON()
    };
  }

  /**
   * @deprecated use connection.id instead
   * Context connectionId getter
   * @returns {null|string}
   */
  get connectionId () {
    return this[_connection].id;
  }

  /**
   * @deprecated use connection.id instead
   * Context connectionId setter
   * @param {null|string} str - new context connectionId
   */
  set connectionId (str) {
    this[_connection].id = assert.assertString('connectionId', str);
  }

  /**
   * @deprecated use connection.protocol instead
   * Context protocol getter
   * @returns {null|string}
   */
  get protocol () {
    return this[_connection].protocol;
  }

  /**
   * @deprecated use connection.protocol instead
   * Context protocol setter
   * @param {null|string} str - new context protocol
   */
  set protocol (str) {
    this[_connection].protocol = assert.assertString('protocol', str);
  }

  /**
   * Context connection informations getter
   * @returns {object}
   */
  get connection() {
    return this[_connection];
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
