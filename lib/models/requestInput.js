'use strict';

const
  InternalError = require('../errors/internalError'),
  assert = require('../utils/assertType');

// private properties
const
  __id = Symbol.for('_id'),
  _index = Symbol.for('index'),
  _collection = Symbol.for('collection'),
  _jwt = Symbol.for('jwt'),
  _volatile = Symbol.for('volatile'),
  _body = Symbol.for('body'),
  _controller = Symbol.for('controller'),
  _action = Symbol.for('action');

class Resource {
  constructor() {
    this[__id] = null;
    this[_index] = null;
    this[_collection] = null;

    Object.seal(this);
  }

  get _id () {
    return this[__id];
  }

  set _id (str) {
    this[__id] = assert.assertString('_id', str);
  }

  get index () {
    return this[_index];
  }

  set index (str) {
    this[_index] = assert.assertString('index', str);
  }

  get collection () {
    return this[_collection];
  }

  set collection (str) {
    this[_collection] = assert.assertString('collection', str);
  }
}

/**
 * Builds a Kuzzle normalized request input object
 *
 * The 'data' object accepts a request content using the same
 * format as the one used, for instance, for the Websocket protocol
 *
 * Any undefined option is set to null
 *
 * @class
 * @param {object} data
 */

/**
 * @name RequestInput#args
 * @type {object}
 */
/**
 * @name RequestInput#volatile
 * @type {object}
 */
/**
 * @name RequestInput#body
 * @type {object}
 */
/**
 * @name RequestInput#controller
 * @type {string}
 */
/**
 * @name RequestInput#action
 * @type {string}
 */
/**
 * @name RequestInput#jwt
 * @type {string}
 */
/**
 * @name RequestInput#resource
 * @type {object}
 */
/**
 * @name RequestInput#resource._id
 * @type {string}
 */
/**
 * @name RequestInput#resource.index
 * @type {string}
 */
/**
 * @name RequestInput#resource.collection
 * @type {string}
 */
class RequestInput {
  constructor(data)
  {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new InternalError('Input request data must be a non-null object');
    }

    this[_jwt] = null;
    this[_volatile] = null;
    this[_body] = null;
    this[_controller] = null;
    this[_action] = null;

    this.args = {};
    this.resource = new Resource();

    Object.seal(this);

    const symbols = Array.prototype.concat(Object.getOwnPropertySymbols(this), Object.getOwnPropertySymbols(this.resource))
      .map(sym => Symbol.keyFor(sym));

    Object.keys(data).forEach(k => {
      if (symbols.indexOf(k) === -1) {
        this.args[k] = data[k];
      }
    });

    this.jwt = data.jwt;
    this.volatile = data.volatile;
    this.body = data.body;
    this.controller = data.controller;
    this.action = data.action;
    this.resource.index = data.index;
    this.resource.collection = data.collection;
    this.resource._id = data._id;
  }

  /**
   * Request jwt getter
   * @returns {null|string}
   */
  get jwt () {
    return this[_jwt];
  }

  /**
   * Request jwt setter
   * @param {null|string} str - new jwt
   */
  set jwt (str) {
    this[_jwt] = assert.assertString('jwt', str);
  }

  /**
   * Request controller getter
   * @returns {null|string}
   */
  get controller () {
    return this[_controller];
  }

  /**
   * Request controller setter
   * @param {null|string} str - new request controller
   */
  set controller (str) {
    // can only be set once
    if (!this[_controller]) {
      this[_controller] = assert.assertString('controller', str);
    }
  }

  /**
   * Request action getter
   * @returns {null|string}
   */
  get action () {
    return this[_action];
  }

  /**
   * Request action setter
   * @param {null|string} str - new request action
   */
  set action (str) {
    // can only be set once
    if (!this[_action]) {
      this[_action] = assert.assertString('action', str);
    }
  }

  /**
   * Request body getter
   * @returns {null|object}
   */
  get body () {
    return this[_body];
  }

  /**
   * Request body setter
   * @param {null|object} obj - new request body
   */
  set body (obj) {
    this[_body] = assert.assertObject('body', obj);
  }

  /**
   * Request volatile getter
   * @returns {null|object}
   */
  get volatile () {
    return this[_volatile];
  }

  /**
   * Request volatile setter
   * @param {null|object} obj - new request volatile
   */
  set volatile (obj) {
    this[_volatile] = assert.assertObject('volatile', obj);
  }
}

/**
 * @type {RequestInput}
 */
module.exports = RequestInput;
