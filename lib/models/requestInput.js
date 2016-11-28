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
 * @property {object} args
 * @property {object} metadata
 * @property {object} body
 * @property {string} controller
 * @property {string} action
 * @property {object} resource
 * @property {string} resource._id
 * @property {string} resource.index
 * @property {string} resource.collection
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

    this.token = assert.assertString('token', data.token);
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
