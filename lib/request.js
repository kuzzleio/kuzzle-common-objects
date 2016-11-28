'use strict';

const
  uuid = require('uuid'),
  assert = require('./utils/assertType'),
  RequestContext = require('./models/requestContext'),
  RequestInput = require('./models/requestInput'),
  KuzzleError = require('./errors/kuzzleError'),
  InternalError = require('./errors/internalError');

/**
 * Builds a Kuzzle normalized request object
 *
 * The 'data' object accepts a request content using the same
 * format as the one used, for instance, for the Websocket protocol
 *
 * Any undefined option is set to null
 *
 * @class
 * @property {string} id
 * @property {number} timestamp
 * @property {number} status
 * @property {object} error
 * @property {*} result
 * @property {RequestInput} input
 * @property {RequestContext} context
 *
 * @param {Object} data - raw request content
 * @param {Object} [options]
 * @constructor
 */
class Request {
  constructor(data, options) {
    Object.defineProperties(this, {
      id: {
        value: uuid.v4(),
        enumerable: true
      },
      timestamp: {
        value: Date.now(),
        enumerable: true
      }
    });

    this.status = 102;
    this.error = null;
    this.result = null;

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
        this.status = assert.assertInteger('status', options.status);
      }
    }

    this.input = new RequestInput(data);

    this.context = new RequestContext(options);
  }

  /**
   * Sets the request status to the error one, and fills the error member
   *
   * @param {Object} error
   */
  setError(error) {
    if (!error || !(error instanceof Error)) {
      throw new InternalError('cannot set non-error object as a request\'s error');
    }

    this.error = error instanceof KuzzleError ? error : new InternalError(error);
    this.status = this.error.status;
  }

  /**
   * Sets the result and request status
   *
   * @param {Object} result - result content
   * @param {Number} [status] - defaults to 200
   */
  setResult(result, status) {
    if (result instanceof Error) {
      throw new InternalError('cannot set an error as a request\'s response');
    }

    status = status || 200;

    this.status = assert.assertInteger('status', status);
    this.result = result;
  }

  get response() {
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
  }
}

/**
 * @type {Request}
 */
module.exports = Request;
