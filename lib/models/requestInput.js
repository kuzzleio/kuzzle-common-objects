'use strict';

const
  InternalError = require('../errors/internalError'),
  assert = require('../utils/assertType');

// Private variables
let
  _jwt = new WeakMap(),
  _metadata = new WeakMap(),
  _body = new WeakMap(),
  _controller = new WeakMap(),
  _action = new WeakMap(),
  _resourceIndex = new WeakMap(),
  _resourceCollection = new WeakMap(),
  _resourceId = new WeakMap();

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

    Object.defineProperties(this, {
      jwt: {
        enumerable: true,
        get: function () { return _jwt.get(this); },
        set: function (str) { _jwt.set(this, assert.assertString('jwt', str)); }
      },
      controller: {
        enumerable: true,
        get: function () { return _controller.get(this); },
        set: function (str) { _controller.set(this, assert.assertString('controller', str)); }
      },
      action: {
        enumerable: true,
        get: function () { return _action.get(this); },
        set: function (str) { _action.set(this, assert.assertString('action', str)); }
      },
      resource: {
        value: {},
        enumerable: true
      },
      args: {
        value: {},
        enumerable: true
      },
      body: {
        enumerable: true,
        get: function () { return _body.get(this); },
        set: function (obj) { _body.set(this, assert.assertObject('body', obj)); }
      },
      metadata: {
        enumerable: true,
        get: function () { return _metadata.get(this); },
        set: function (obj) { _metadata.set(this, assert.assertObject('metadata', obj)); }
      }
    });

    Object.defineProperties(this.resource, {
      index: {
        get: function () { return _resourceIndex.get(this); },
        set: function(str) { _resourceIndex.set(this, assert.assertString('index', str)); },
        enumerable: true
      },
      collection: {
        get: function () { return _resourceCollection.get(this); },
        set: function(str) { _resourceCollection.set(this, assert.assertString('collection', str)); },
        enumerable: true
      },
      _id: {
        get: function () { return _resourceId.get(this); },
        set: function(str) { _resourceId.set(this, assert.assertString('_id', str)); },
        enumerable: true
      }
    });

    Object.seal(this.resource);
    Object.seal(this);

    Object.keys(data).forEach(k => {
      if (!this.hasOwnProperty(k) && !this.resource.hasOwnProperty(k)) {
        this.args[k] = data[k];
      }
    });

    this.jwt = data.jwt;
    this.metadata = data.metadata;
    this.body = data.body;
    this.controller = data.controller;
    this.action = data.action;
    this.resource.index = data.index;
    this.resource.collection = data.collection;
    this.resource._id = data._id;
  }
}

/**
 * @type {RequestInput}
 */
module.exports = RequestInput;
