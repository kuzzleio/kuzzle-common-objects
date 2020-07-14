'use strict';

import * as assert from '../utils/assertType';
import { JSONObject } from '../utils/interfaces';
import { KuzzleError } from '../errors/kuzzleError';

const _request = 'request\u200b';
const _headers = 'headers\u200b';

class Headers {
  public headers: JSONObject;
  private namesMap: Map<string, string>;
  private proxy: JSONObject;

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
 * Kuzzle normalized API response
 */
export class RequestResponse {
  /**
   * If sets to true, "result" content will not be wrapped in a Kuzzle response
   */
  public raw: boolean;

  constructor (request) {
    this.raw = false;
    this[_request] = request;
    this[_headers] = new Headers();

    Object.seal(this);
  }

  /**
   * Request HTTP status
   */
  get status (): number {
    return this[_request].status;
  }

  set status (s: number) {
    this[_request].status = s;
  }

  /**
   * Request error
   */
  get error (): KuzzleError | null {
    return this[_request].error;
  }

  set error (e: KuzzleError | null) {
    this[_request].setError(e);
  }

  /**
   * Request external ID
   */
  get requestId (): string | null {
    return this[_request].id;
  }

  /**
   * API controller name
   */
  get controller (): string | null {
    return this[_request].input.controller;
  }

  /**
   * API action name
   */
  get action (): string | null {
    return this[_request].input.action;
  }

  /**
   * Collection name
   */
  get collection (): string | null {
    return this[_request].input.resource.collection;
  }

  /**
   * Index name
   */
  get index (): string | null {
    return this[_request].input.resource.index;
  }

  /**
   * Volatile object
   */
  get volatile (): JSONObject | null {
    return this[_request].input.volatile;
  }

  /**
   * Response headers
   */
  get headers (): JSONObject {
    return this[_headers].proxy;
  }

  /**
   * Request result
   */
  get result (): any {
    return this[_request].result;
  }

  set result (r: any) {
    this[_request].setResult(r);
  }

  /**
   * Gets a header value (case-insensitive)
   */
  getHeader (name: string): string | null {
    return this[_headers].getHeader(name);
  }

  /**
   * Deletes a header (case-insensitive)
   */
  removeHeader (name: string) {
    return this[_headers].removeHeader(name);
  }

  /**
   * Sets a new array. Behaves the same as Node.js' HTTP response.setHeader
   * method (@see https://nodejs.org/api/http.html#http_response_setheader_name_value)
   */
  setHeader (name: string, value: string) {
    return this[_headers].setHeader(name, value);
  }

  /**
   * Adds new multiple headers.
   */
  setHeaders (headers: JSONObject) {
    assert.assertObject('headers', headers);

    if (headers) {
      Object.keys(headers).forEach(name => this.setHeader(name, headers[name]));
    }
  }

  /**
   * Serializes the response.
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