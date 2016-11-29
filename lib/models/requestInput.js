'use strict';

const
  InternalError = require('../errors/internalError'),
  assert = require('../utils/assertType');

/**
 * Builds a Kuzzle normalized request input object
 *
 * The 'data' object accepts a request content using the same
 * format as the one used, for instance, for the Websocket protocol
 *
 * Any undefined option is set to null
 *
 * @class
 * @property {object} args - request specific arguments
 * @property {object} metadata - client volatile metadata
 * @property {object} body - request body
 * @property {string} controller - kuzzle controller to invoke
 * @property {string} action - controller's action to execute
 * @property {string} jwt - authentication token
 * @property {object} resource
 * @property {string} resource._id - document unique identifier
 * @property {string} resource.index - data index
 * @property {string} resource.collection - data collection
 *
 * @param data
 * @constructor
 */
class RequestInput {
  constructor(data)
  {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new InternalError('Input request data must be a non-null object');
    }

    this.jwt = assert.assertString('jwt', data.jwt);
    this.metadata = assert.assertObject('metadata', data.metadata);
    this.body = assert.assertObject('body', data.body);
    this.controller = assert.assertString('controller', data.controller);
    this.action = assert.assertString('action', data.action);

    this.resource = {
      index: assert.assertString('index', data.index),
      collection: assert.assertString('collection', data.collection),
      _id: assert.assertString('_id', data._id)
    };

    this.args = {};
    Object.keys(data).forEach(k => {
      if (!this.hasOwnProperty(k) && !this.resource.hasOwnProperty(k)) {
        this.args[k] = data[k];
      }
    });
  }
}

/**
 * @type {RequestInput}
 */
module.exports = RequestInput;
