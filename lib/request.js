'use strict';

const
  uuid = require('uuid'),
  assert = require('./utils/assertType'),
  RequestContext = require('./models/requestContext'),
  RequestInput = require('./models/requestInput'),
  KuzzleError = require('./errors/kuzzleError'),
  InternalError = require('./errors/internalError');

// Private variables
let
  _status = new WeakMap(),
  _input = new WeakMap(),
  _context = new WeakMap(),
  _error = new WeakMap(),
  _result = new WeakMap();

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
 * @name Request#input
 * @type {RequestInput}
 */
/**
 * @name Request#status
 * @type {number}
 */
/**
 * @name Request#error
 * @type {error|KuzzleError}
 */
/**
 * @name Request#response
 * @type {object}
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
    Object.defineProperties(this,
    {
      id: {
        value: data.requestId ? assert.assertString('requestId', data.requestId) : uuid.v4(),
        enumerable: true,
        writable: true
      },
      timestamp: {
        value: Date.now(),
        enumerable: true
      },
      status: {
        set: function (i) { _status.set(this, assert.assertInteger('status', i)); },
        get: function () { return _status.get(this); },
        enumerable: true
      },
      error: {
        get: function () { return _error.get(this); },
        enumerable: true
      },
      input: {
        get: function () { return _input.get(this); },
        enumerable: true
      },
      result: {
        get: function () { return _result.get(this); },
        enumerable: true
      },
      context: {
        get: function () { return _context.get(this); },
        enumerable: true
      },
      response: {
        get: function () {
          return {
            status: this.status,
            error: this.error,
            requestId: this.id,
            controller: this.input.controller,
            action: this.input.action,
            collection: this.input.resource.collection,
            index: this.input.resource.index,
            metadata: this.input.metadata,
            result: this.result
          };
        },
        enumerable: true
      }
    });

    this.status = 102;
    _error.set(this, null);
    _result.set(this, null);

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
        this.setResult(options.result);
      }

      if (options.error) {
        this.setError(options.error);
      }

      if (options.status) {
        this.status = options.status;
      }
    }

    _input.set(this, new RequestInput(data));
    _context.set(this, new RequestContext(options));

    Object.seal(this);
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

    _error.set(this, error instanceof KuzzleError ? error : new InternalError(error));
    this.status = this.error.status;
  }

  /**
   * Sets the result and request status
   *
   * @param {Object} result - result content
   * @param {Number} [status] - defaults to 200
   * @memberOf Request
   */
  setResult(result, status) {
    if (result instanceof Error) {
      throw new InternalError('cannot set an error as a request\'s response');
    }

    this.status = status || 200;
    _result.set(this, result);
  }
}


/**
 * @type {Request}
 */
module.exports = Request;
