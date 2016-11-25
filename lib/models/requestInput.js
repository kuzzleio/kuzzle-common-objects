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
    this.metadata = data.metadata || null;
    this.body = data.body || null;
    this.controller = data.controller || null;
    this.action = data.action || null;

    this.resource = {
      index: data.index || null,
      collection: data.collection || null,
      _id: data._id || null
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
