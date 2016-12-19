'use strict';

const
  assert = require('../utils/assertType');

const
  _request = Symbol('request'),
  _headers = Symbol('headers');

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
    this[_headers] = this[_request][Symbol.for('request.response.headers')];

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
    return this[_request].status = s;
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
    return this[_request].setError(e);
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
   * Get the parent request metadata
   * @returns {Object}
   */
  get metadata () {
    return this[_request].input.metadata;
  }

  /**
   * Get the response headers - reference to private parent request property
   * @returns {*}
   */
  get headers () {
    return this[_headers];
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
    return this[_request].setResult(r);
  }

  /**
   * Get the header value for {name} (case-insensitive)
   * @public
   * @param {string} name
   */
  getHeader (name) {
    const key = Object.keys(this[_headers])
      .find(key => key.toLowerCase() === name.toLowerCase());

    if (key) {
      return this[_headers][key];
    }
  }

  /**
   * Delete the header matching {name} (case-insensitive=
   * @param {string} name
   */
  removeHeader (name) {
    Object.keys(this[_headers])
      .filter(key => key.toLowerCase() === name.toLowerCase())
      .forEach(key => delete this[_headers][key]);
  }

  /**
   * Set a new array. Behaves the same as [Node HTTP response.setHeader method](https://nodejs.org/api/http.html#http_response_setheader_name_value)
   * @param {string} name
   * @param {string} value
   */
  setHeader (name, value) {
    assert.assertString('header name', name);
    assert.assertString('header value', value);

    const lowercased = name.toLowerCase();

    // Handles specific HTTP headers
    switch(lowercased) {
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
        this[_headers][lowercased] = value;
        break;
      case 'set-cookie':
        if (!this[_headers]['set-cookie']) {
          this[_headers]['set-cookie'] = [value];
        }
        else {
          this[_headers]['set-cookie'].push(value);
        }
        break;
      default:
        /*
         Non-HTTP headers might be case sensitive, so we
         get rid of the "lowercased" constant here, except
         when looking for the stored header
          */
        const key = Object.keys(this[_headers])
          .find(key => key.toLowerCase() === lowercased);

        if (key) {
          this[_headers][key] += ', ' + value;
        }
        else {
          this[_headers][name] = value;
        }
    }

  }

  /**
   * **Add** new multiple headers
   * @param {object} headers
   */
  setHeaders (headers) {
    let hdrs = assert.assertUniTypeObject('headers', headers, 'string');

    if (hdrs === null) {
      return;
    }

    Object.keys(hdrs)
      .forEach(name => this.setHeader(name, hdrs[name]));
  }

  /**
   * Serialize the response. Exposes the prototype getters values
   * @returns {object}
   */
  toJSON () {
    if (this.raw === true) {
      return {
        raw: true,
        content: this.result,
        headers: this.headers
      };
    }

    return {
      raw: false,
      content: {
        status: this.status,
        error: this.error,
        requestId: this.requestId,
        controller: this.controller,
        action: this.action,
        collection: this.collection,
        index: this.index,
        metadata: this.metadata,
        result: this.result
      },
      headers: this.headers
    };
  }
}

module.exports = RequestResponse;
