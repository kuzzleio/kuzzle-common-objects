'use strict';

/**
 * Builds a Kuzzle normalized request input object
 *
 * The 'data' object accepts a request content using the same
 * format as the one used, for instance, for the Websocket protocol
 *
 * Any undefined option is set to null
 *
 * @param data
 * @constructor
 */
class RequestInput {
  constructor(data)
  {
    [
      'action',
      'body',
      'controller',
      'metadata'
    ].forEach(prop => {
      this[prop] = data[prop] || null;
    });

    this.resource = {};
    [
      '_id',
      'collection',
      'index'
    ].forEach(prop => {
      this.resource[prop] = data[prop] || null;
    });

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
