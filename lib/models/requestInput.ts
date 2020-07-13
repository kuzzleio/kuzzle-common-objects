'use strict';

import * as InternalError from '../errors/internalError';
import * as assert from '../utils/assertType';
import { JSONObject } from '../utils/interfaces';

// private properties
const __id = '_id\u200b';
const _index = 'index\u200b';
const _collection = 'collection\u200b';
const _jwt = 'jwt\u200b';
const _volatile = 'volatile\u200b';
const _body = 'body\u200b';
const _headers = 'headers\u200b';
const _controller = 'controller\u200b';
const _action = 'action\u200b';

// any property not listed here will be copied into
// RequestInput.args
const resourceProperties = new Set([
  'jwt',
  'volatile',
  'body',
  'controller',
  'action',
  'index',
  'collection',
  '_id'
]);

class Resource {
  constructor() {
    this[__id] = null;
    this[_index] = null;
    this[_collection] = null;

    Object.seal(this);
  }

  get _id (): string | null {
    return this[__id];
  }

  set _id (str: string) {
    this[__id] = assert.assertString('_id', str);
  }

  get index (): string | null {
    return this[_index];
  }

  set index (str: string) {
    this[_index] = assert.assertString('index', str);
  }

  get collection (): string | null {
    return this[_collection];
  }

  set collection (str: string) {
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
 * @name RequestInput#headers
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
export class RequestInput {
  public args: JSONObject;
  public resource: Resource;

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

    // copy into this.args only unrecognized properties
    for (const k of Object.keys(data)) {
      if (!resourceProperties.has(k)) {
        this.args[k] = data[k];
      }
    }

    // @deprecated - RequestContext.connection.misc.headers should be used instead
    // initialize `_headers` property after the population of `this.args` attribute
    // `this.headers` can contain protocol specific headers and should be
    // set after the Request construction
    // `args.headers` can be an attribute coming from data itself.
    this[_headers] = null;

    Object.seal(this);

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
  get jwt (): string | null {
    return this[_jwt];
  }

  /**
   * Request jwt setter
   * @param {null|string} str - new jwt
   */
  set jwt (str: string) {
    this[_jwt] = assert.assertString('jwt', str);
  }

  /**
   * Request controller getter
   * @returns {null|string}
   */
  get controller (): string | null {
    return this[_controller];
  }

  /**
   * Request controller setter
   * @param {null|string} str - new request controller
   */
  set controller (str: string) {
    // can only be set once
    if (!this[_controller]) {
      this[_controller] = assert.assertString('controller', str);
    }
  }

  /**
   * Request action getter
   * @returns {null|string}
   */
  get action (): string | null {
    return this[_action];
  }

  /**
   * Request action setter
   * @param {null|string} str - new request action
   */
  set action (str: string) {
    // can only be set once
    if (!this[_action]) {
      this[_action] = assert.assertString('action', str);
    }
  }

  /**
   * Request body getter
   * @returns {null|object}
   */
  get body (): JSONObject | null {
    return this[_body];
  }

  /**
   * Request body setter
   * @param {null|object} obj - new request body
   */
  set body (obj: JSONObject) {
    this[_body] = assert.assertObject('body', obj);
  }

  /**
   * Request headers getter
   * @returns {null|object}
   */
  get headers (): JSONObject | null {
    return this[_headers];
  }

  /**
   * Request headers setter
   * @param {null|object} obj - new request headers
   */
  set headers (obj: JSONObject) {
    this[_headers] = assert.assertObject('headers', obj);
  }

  /**
   * Request volatile getter
   * @returns {null|object}
   */
  get volatile (): JSONObject | null {
    return this[_volatile];
  }

  /**
   * Request volatile setter
   * @param {null|object} obj - new request volatile
   */
  set volatile (obj: JSONObject) {
    this[_volatile] = assert.assertObject('volatile', obj);
  }
}

module.exports = { RequestInput };