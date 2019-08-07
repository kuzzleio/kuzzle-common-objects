'use strict';

const assert = require('../utils/assertType');

const
  _request = 'request\u200b',
  _headers = 'headers\u200b';

class Headers {
  constructor() {
    this.namesMap = new Map();
    this.headers = {};
    this.proxy = new Proxy(this.headers, {
      get: (target, name) => this.getHeader(name),
      set: (target, name, value) => this.setHeader(name, value),
      deleteProperty: (target, name) => this.removeHeader(name)
    });
  }

  getHeader (name) {
    if (typeof name === 'symbol') {
      return this.headers[name];
    }

    assert.assertString('header name', name);

    if (!name) {
      return;
    }

    return this.headers[this.namesMap.get(name.toLowerCase())];
  }

  removeHeader (name) {
    assert.assertString('header name', name);

    if (!name) {
      return true;
    }

    const
      lowerCased = name.toLowerCase(),
      storedName = this.namesMap.get(lowerCased);

    if (storedName) {
      delete this.headers[storedName];
      this.namesMap.delete(lowerCased);
    }

    return true;
  }

  setHeader (name, value) {
    assert.assertString('header name', name);

    if (!name) {
      return true;
    }

    const
      lowerCased = name.toLowerCase(),
      _value = String(value);

    let _name = this.namesMap.get(lowerCased);

    if (!_name) {
      this.namesMap.set(lowerCased, name);
      _name = name;
    }

    // Common HTTP headers are overwritten when set, instead of being
    // concatenated
    switch (lowerCased) {
      case 'age':
      case 'authorization':
      case 'content-length':
      case 'content-type':
      case 'etag':
      case 'expires':
      case 'from':
      case 'host':
      case 'if-modified-since':
      case 'if-unmodified-since':
      case 'last-modified, location':
      case 'max-forwards':
      case 'proxy-authorization':
      case 'referer':
      case 'retry-after':
      case 'user-agent':
        this.headers[_name] = _value;
        break;
      case 'set-cookie':
        if (!this.headers[_name]) {
          this.headers[_name] = [_value];
        }
        else {
          this.headers[_name].push(_value);
        }
        break;
      default: {
        if (this.headers[_name]) {
          this.headers[_name] += ', ' + _value;
        }
        else {
          this.headers[_name] = _value;
        }
      }
    }

    return true;
  }
}

/**
 * Kuzzle normalized response
 *
 * @class
 * @param {Request} request
 *
 */
class RequestResponse {
  constructor (request) {
    this.raw = false;
    this[_request] = request;
    this[_headers] = new Headers();

    Object.seal(this);
  }

  /**
   * Get the parent request status
   * @returns {number}
   */
  get status () {
    return this[_request].status;
  }

  /**
   * Set the parent request status
   * @param {number} s
   */
  set status (s) {
    this[_request].status = s;
  }

  /**
   * Get the parent request error
   * @returns {KuzzleError}
   */
  get error () {
    return this[_request].error;
  }

  /**
   * Set the parent request error
   * @param {KuzzleError} e
   */
  set error (e) {
    this[_request].setError(e);
  }

  /**
   * Get the parent request id
   * @returns {string|*|String}
   */
  get requestId () {
    return this[_request].id;
  }

  /**
   * Get the parent request controller
   * @returns {string}
   */
  get controller () {
    return this[_request].input.controller;
  }

  /**
   * Get the parent request action
   * @returns {string}
   */
  get action () {
    return this[_request].input.action;
  }

  /**
   * Get the parent request collection
   * @returns {string}
   */
  get collection () {
    return this[_request].input.resource.collection;
  }

  /**
   * Get the parent request index
   * @returns {string}
   */
  get index () {
    return this[_request].input.resource.index;
  }

  /**
   * Get the parent request volatile data
   * @returns {Object}
   */
  get volatile () {
    return this[_request].input.volatile;
  }

  /**
   * Get the response headers - reference to private parent request property
   * @returns {*}
   */
  get headers () {
    return this[_headers].proxy;
  }

  /**
   * Get the parent request result
   * @returns {*|null|*|Object}
   */
  get result () {
    return this[_request].result;
  }

  /**
   * Set the parent request result
   * @param {*} r
   */
  set result (r) {
    this[_request].setResult(r);
  }

  /**
   * Get the header value for {name} (case-insensitive)
   * @public
   * @param {string} name
   */
  getHeader (name) {
    return this[_headers].getHeader(name);
  }

  /**
   * Delete the header matching {name} (case-insensitive=
   * @param {string} name
   */
  removeHeader (name) {
    return this[_headers].removeHeader(name);
  }

  /**
   * Set a new array. Behaves the same as Node.js' HTTP response.setHeader
   * method (@see https://nodejs.org/api/http.html#http_response_setheader_name_value)
   * @param {string} name
   * @param {*} value
   */
  setHeader (name, value) {
    return this[_headers].setHeader(name, value);
  }

  /**
   * Add new multiple headers.
   * @param {object} headers
   */
  setHeaders (headers) {
    assert.assertObject('headers', headers);

    if (headers) {
      Object.keys(headers).forEach(name => this.setHeader(name, headers[name]));
    }
  }

  /**
   * Serialize the response. Exposes the prototype getters values
   * @returns {object}
   */
  toJSON () {
    if (this.raw === true) {
      return {
        raw: true,
        status: this.status,
        requestId: this.requestId,
        content: this.result,
        headers: this.headers
      };
    }

    return {
      raw: false,
      status: this.status,
      requestId: this.requestId,
      content: {
        requestId: this.requestId,
        status: this.status,
        error: this.error,
        controller: this.controller,
        action: this.action,
        collection: this.collection,
        index: this.index,
        volatile: this.volatile,
        result: this.result
      },
      headers: this.headers
    };
  }
}

module.exports = RequestResponse;
