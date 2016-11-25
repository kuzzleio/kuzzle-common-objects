'use strict';

const
  uuid = require('uuid'),
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
 * @param {Object} data - request raw content
 * @constructor
 */
class Request {
  constructor(data) {
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

    this.input = new RequestInput(data);

    this.context = new RequestContext();
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

    if (status !== undefined && !Number.isInteger(status)) {
      throw new InternalError('cannot set non-integer value as a request\'s status');
    }

    this.status = status || 200;
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
