'use strict';

import * as assert from '../utils/assertType';
import { JSONObject } from '../utils/interfaces';
import KuzzleError from '../errors/kuzzleError';

const _request = 'request\u200b';
const _headers = 'headers\u200b';

class Headers {
  public headers: JSONObject;
  private namesMap: Map<string, string>;
  private proxy: any;

  constructor() {
    this.namesMap = new Map();
    this.headers = {};
    this.proxy = new Proxy(this.headers, {
      get: (target, name) => this.getHeader(name as string),
      set: (target, name, value) => this.setHeader(name as string, value),
      deleteProperty: (target, name) => this.removeHeader(name as string)
    });
  }

  getHeader (name: string): string | undefined {
    if (typeof name === 'symbol') {
      return this.headers[name];
    }

    assert.assertString('header name', name);

    if (!name) {
      return;
    }

    return this.headers[this.namesMap.get(name.toLowerCase())];
  }

  removeHeader (name: string): boolean {
    assert.assertString('header name', name);

    if (!name) {
      return true;
    }

    const lowerCased = name.toLowerCase();
    const storedName = this.namesMap.get(lowerCased);

    if (storedName) {
      delete this.headers[storedName];
      this.namesMap.delete(lowerCased);
    }

    return true;
  }

  setHeader (name: string, value: string): boolean {
    assert.assertString('header name', name);

    if (!name) {
      return true;
    }

    const lowerCased = name.toLowerCase();
    const _value = String(value);

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
export class RequestResponse {
  /**
   * If sets to true, returns only the provided "result" in response "content"
   */
  public raw: boolean;

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
  get status (): number {
    return this[_request].status;
  }

  /**
   * Set the parent request status
   * @param {number} s
   */
  set status (s: number) {
    this[_request].status = s;
  }

  /**
   * Get the parent request error
   * @returns {KuzzleError}
   */
  get error (): KuzzleError {
    return this[_request].error;
  }

  /**
   * Set the parent request error
   * @param {KuzzleError} e
   */
  set error (e: KuzzleError) {
    this[_request].setError(e);
  }

  /**
   * Get the parent request id
   * @returns {string|*|String}
   */
  get requestId (): string | null {
    return this[_request].id;
  }

  /**
   * Get the parent request controller
   * @returns {string}
   */
  get controller (): string | null {
    return this[_request].input.controller;
  }

  /**
   * Get the parent request action
   * @returns {string}
   */
  get action (): string | null {
    return this[_request].input.action;
  }

  /**
   * Get the parent request collection
   * @returns {string}
   */
  get collection (): string | null {
    return this[_request].input.resource.collection;
  }

  /**
   * Get the parent request index
   * @returns {string}
   */
  get index (): string | null {
    return this[_request].input.resource.index;
  }

  /**
   * Get the parent request volatile data
   * @returns {Object}
   */
  get volatile (): JSONObject | null {
    return this[_request].input.volatile;
  }

  /**
   * Get the response headers - reference to private parent request property
   * @returns {*}
   */
  get headers (): JSONObject {
    return this[_headers].proxy;
  }

  /**
   * Get the parent request result
   * @returns {*|null|*|Object}
   */
  get result (): any {
    return this[_request].result;
  }

  /**
   * Set the parent request result
   * @param {*} r
   */
  set result (r: any) {
    this[_request].setResult(r);
  }

  /**
   * Get the header value for {name} (case-insensitive)
   * @public
   * @param {string} name
   */
  getHeader (name: string): string | null {
    return this[_headers].getHeader(name);
  }

  /**
   * Delete the header matching {name} (case-insensitive=
   * @param {string} name
   */
  removeHeader (name: string) {
    return this[_headers].removeHeader(name);
  }

  /**
   * Set a new array. Behaves the same as Node.js' HTTP response.setHeader
   * method (@see https://nodejs.org/api/http.html#http_response_setheader_name_value)
   * @param {string} name
   * @param {*} value
   */
  setHeader (name: string, value: string) {
    return this[_headers].setHeader(name, value);
  }

  /**
   * Add new multiple headers.
   * @param {object} headers
   */
  setHeaders (headers: JSONObject) {
    assert.assertObject('headers', headers);

    if (headers) {
      Object.keys(headers).forEach(name => this.setHeader(name, headers[name]));
    }
  }

  /**
   * Serialize the response. Exposes the prototype getters values
   * @returns {object}
   */
  toJSON (): JSONObject {
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

module.exports = { RequestResponse };