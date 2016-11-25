'use strict';

const
  uuid = require('uuid'),
  RequestContext = require('./models/requestContext'),
  RequestInput = require('./models/requestInput');

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
    if (!error) {
      return;
    }

    this.status = error.status || 500;
    this.error = error;
  }

  /**
   * Sets the result and request status
   *
   * @param {Object} result - result content
   * @param {Number} [status] - defaults to 200
   */
  setResult(result, status) {
    this.status = status || 200;
    this.result = result;
  }
}

/**
 * @type {Request}
 */
module.exports = Request;
