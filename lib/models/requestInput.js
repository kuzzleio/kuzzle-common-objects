'use strict';

const
  InternalError = require('../errors/internalError'),
  ParseError = require('../errors/parseError');

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

    this.metadata = assertObject('metadata', data.metadata);
    this.body = assertObject('body', data.body);
    this.controller = assertString('controller', data.controller);
    this.action = assertString('action', data.action);

    this.resource = {
      index: assertString('index', data.index),
      collection: assertString('collection', data.collection),
      _id: assertString('_id', data._id)
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
 * Throws if the provided data is not an object.
 * Returns the unmodified data if validated
 *
 * @throws
 * @param {string} attr - tested attribute name
 * @param {*} data
 * @return {object}
 */
function assertObject(attr, data) {
  if (data === null || data === undefined) {
    return null;
  }

  if (typeof data !== 'object' || Array.isArray(data)) {
    throw new ParseError(`Attribute ${attr} must be of type "object"`);
  }

  return data;
}


/**
 * Throws if the provided data is not a string
 * Returns the unmodified data if validated
 *
 * @throws
 * @param {string} attr - tested attribute name
 * @param {*} data
 * @return {null|string}
 */
function assertString(attr, data) {
  if (data === null || data === undefined) {
    return null;
  }

  if (typeof data !== 'string') {
    throw new ParseError(`Attribute ${attr} must be of type "string"`);
  }

  return data;
}

/**
 * @type {RequestInput}
 */
module.exports = RequestInput;
