'use strict';

const
  uuid = require('uuid'),
  assert = require('./utils/assertType'),
  RequestContext = require('./models/requestContext'),
  RequestInput = require('./models/requestInput'),
  RequestResponse = require('./models/requestResponse'),
  KuzzleError = require('./errors/kuzzleError'),
  InternalError = require('./errors/internalError');

// private properties
const
  _status = Symbol(),
  _input = Symbol(),
  _error = Symbol(),
  _responseHeaders = Symbol.for('request.response.headers'),
  _result = Symbol(),
  _context = Symbol(),
  _timestamp = Symbol(),
  _response = Symbol(),
  _triggered = Symbol(),
  _origin = Symbol(),
  _previous = Symbol();

/**
 * Builds a Kuzzle normalized request object
 *
 * The 'data' object accepts a request content using the same
 * format as the one used, for instance, for the Websocket protocol
 *
 * Any undefined option is set to null
 *
 * @class
 * @param {Object} data - raw request content
 * @param {Object} [options]
 */

/**
 * @name Request#timestamp
 * @type {number}
 */
/**
 * @name Request#id
 * @type {string}
 */
/**
 * @name Request#origin
 * @type {Request}
 */
/**
 * @name Request#previous
 * @type {Request}
 */
/**
 * @name Request#input
 * @type {RequestInput}
 */
/**
 * @name Request#status
 * @type {number}
 */
/**
 * @name Request#error
 * @type {KuzzleError}
 */
/**
 * @name Request#response
 * @type {RequestResponse}
 */
/**
 * @name Request#result
 * @type {*}
 */
/**
 * @name Request#context
 * @type {RequestContext}
 */
class Request {
  constructor(data, options) {
    this[_status] = 102;
    this[_input] = new RequestInput(data);
    this[_error] = null;
    this[_responseHeaders] = {};
    this[_result] = null;
    this[_context] = new RequestContext(options);
    this[_response] = null;
    this[_triggered] = [];
    this[_origin] = null;
    this[_previous] = null;

    this.id = data.requestId ? assert.assertString('requestId', data.requestId) : uuid.v4();
    this[_timestamp] = data.timestamp || Date.now();

    // handling provided options
    if (options !== undefined && options !== null) {
      if (typeof options !== 'object' || Array.isArray(options)) {
        throw new InternalError('Request options must be an object');
      }

      /*
       * Beware of the order of setXxx methods: if there is an
       * error object in the options, it's very probable that
       * the user wants its status to be the request's final
       * status.
       *
       * Likewise, we should initialize the request status last,
       * as it should override any automated status if it has
       * been specified.
       */
      if (options.result) {
        this.setResult(options.result, {status: options.status, headers: options.headers});
      }

      if (options.error) {
        this.setError(options.error);
      }

      if (options.status) {
        this.status = options.status;
      }
    }

    Object.seal(this);
  }

  /**
   * Request timestamp getter
   * @returns {number}
   */
  get timestamp () {
    return this[_timestamp];
  }

  /**
   * Request status getter
   * @returns {number}
   */
  get status () {
    return this[_status];
  }

  /**
   * Request origin getter
   * @returns {Request}
   */
  get origin () {
    return this[_origin];
  }

  /**
   * Request origin setter
   * Can only be set once
   * @param {Request} o - origin request
   */
  set origin (o) {
    if (!(o instanceof Request)) {
      throw new InternalError('Can only set a Request object as a request origin');
    }

    if (!this[_origin]) {
      this[_origin] = o.origin === null ? o : o.origin;
    }
  }

  /**
   * Previous request getter
   * @returns {Request}
   */
  get previous () {
    return this[_previous];
  }

  /**
   * Previous request setter
   * Can only be set once
   * @param {Request} p - origin request
   */
  set previous (p) {
    if (!(p instanceof Request)) {
      throw new InternalError('Can only set a Request object as a previous request');
    }

    if (!this[_previous]) {
      this[_previous] = p;
    }
  }

  /**
   * Request status setter
   * @param {number} i - new request status
   */
  set status (i)  {
    this[_status] = assert.assertInteger('status', i);
  }

  /**
   * Request input getter
   * @returns {RequestInput}
   */
  get input () {
    return this[_input];
  }

  /**
   * Request context getter
   * @returns {RequestContext}
   */
  get context () {
    return this[_context];
  }

  /**
   * Request error getter
   * @returns {null|KuzzleError}
   */
  get error () {
    return this[_error];
  }

  /**
   * Request result getter
   * @returns {null|*}
   */
  get result () {
    return this[_result];
  }

  /**
   * Request response getter
   * @returns {RequestResponse}
   */
  get response () {
    if (this.origin) {
      return this.origin.response;
    }

    if (this[_response] === null) {
      this[_response] = new RequestResponse(this);
    }

    return this[_response];
  }

  /**
   * Tells if this request triggered the event "event" or not.
   * If in a request chain, then the origin request holds the
   * list of triggered events
   *
   * @param {string} event
   * @return {Boolean}
   */
  hasTriggered(event) {
    if (this[_origin]) {
      return this[_origin][_triggered].includes(event);
    }

    return this[_triggered].includes(event);
  }

  /**
   * Adds the event "event" to the list of triggered events
   * @param {string} event
   */
  triggers(event) {
    if (!this.hasTriggered(event)) {
      if (this[_origin]) {
        this[_origin][_triggered].push(event);
      }
      else {
        this[_triggered].push(event);
      }
    }
  }

  /**
   * Sets the request status to the error one, and fills the error member
   *
   * @name setError
   * @param {Object} error
   * @memberOf Request
   */
  setError(error) {
    if (!error || !(error instanceof Error)) {
      throw new InternalError('cannot set non-error object as a request\'s error');
    }

    this[_error] = error instanceof KuzzleError ? error : new InternalError(error);
    this.status = this[_error].status;
  }

  /**
   * Sets the result and request status
   *
   * Optional parameters can be provided with the "options" argument.
   * This optional object may contain the following properties:
   *   - status (number): HTTP status code (default: 200)
   *   - headers (object): additional response protocol headers (default: null)
   *   - raw (boolean): instead of a Kuzzle response, forward the result directly (default: false)
   *
   * @param {Object} result - result content
   * @param {Object} [options] - response options
   * @memberOf Request
   */
  setResult(result, options) {
    options = options || {};

    if (result instanceof Error) {
      throw new InternalError('cannot set an error as a request\'s response');
    }

    this.status = options.status || 200;

    if (options.headers) {
      this.response.setHeaders(options.headers);
    }

    if (options.raw !== undefined) {
      this.response.raw = options.raw;
    }

    this[_result] = result;
  }

  /**
   * Serialize this object into a pair of POJOs that can be send
   * across the network and then used to instantiate a new Request
   * object
   *
   * @return {object}
   * @memberOf Request
   */
  serialize() {
    const serialized = {
      data: {
        timestamp: this[_timestamp],
        requestId: this.id,
        jwt: this[_input].jwt,
        metadata: this[_input].metadata,
        body: this[_input].body,
        controller: this[_input].controller,
        action: this[_input].action,
        index: this[_input].resource.index,
        collection: this[_input].resource.collection,
        _id: this[_input].resource._id,
      },
      options: {
        connectionId: this[_context].connectionId,
        protocol: this[_context].protocol,
        result: this[_result],
        error: this[_error],
        status: this[_status]
      }
    };

    Object.assign(serialized.data, this[_input].args);

    return serialized;
  }
}


/**
 * @type {Request}
 */
module.exports = Request;
