var
  BadRequestError = require('../errors/badRequestError'),
  uuid = require('uuid'),
  Promise = require('bluebird'),
  _ = require('lodash');

/**
 * @param object
 * @param additionalData
 * @param protocol
 * @constructor
 */
function RequestObject(object, additionalData, protocol) {
  this.data = {};
  this.metadata = {};
  this.headers = {};
  this.protocol = null;
  this.index = null;
  this.collection = null;
  this.controller = null;
  this.action = null;
  this.requestId = null;
  this.timestamp = null;
  this.state = null;
  this.scope = null;
  this.users = null;

  construct.call(this, object, additionalData, protocol);
}

/**
 * @param object
 * @param additionalData
 * @param protocol
 * @returns {*}
 */
function construct (object, additionalData, protocol) {
  if (!additionalData) {
    additionalData = {};
  }

  // Mandatory arguments (case sensitive)
  ['action', 'controller', 'collection', 'index'].forEach(attr => {
    this[attr] = object[attr] || additionalData[attr];
  });

  // Optional arguments (case insensitive)
  ['state', 'scope', 'users'].forEach(attr => {
    this[attr] = (object[attr] ? object[attr].toLowerCase() : object[attr]) || (additionalData[attr] ? additionalData[attr].toLowerCase() : additionalData[attr]);
  });

  // the user can define the _id either in body or directly in object
  if (additionalData._id) {
    this.data._id = additionalData._id;
    delete additionalData._id;
  }
  else if (object._id) {
    this.data._id = object._id;
  }
  else if (object.body && object.body._id !== undefined) {
    this.data._id = object.body._id;
  }

  if (object.body !== undefined) {
    this.data.body = object.body;
  }
  else if (object.query !== undefined) {
    this.data.body = {query: object.query};
  }
  else {
    this.data.body = additionalData.body || additionalData;
  }

  if (object.refresh) {
    this.data.refresh = object.refresh;
  }

  if (object.headers !== undefined) {
    this.headers = object.headers;
  }
  else if (additionalData.headers !== undefined) {
    this.headers = additionalData.headers;
  }

  // add protocol into requestObject: rest, ws or mq
  this.protocol = protocol;

  // add the creation date (can be used for 'created at' or 'update at')
  this.timestamp = (new Date().getTime());

  // The request Id is optional, but we have to generate it if the user
  // do not provide it. We need to return this id to let the user know
  // how to get real time information about his data
  this.requestId = object.requestId || uuid.v4();

  // metadata are volatile data passed by users and given back in responses
  if (additionalData.metadata && typeof additionalData.metadata === 'object') {
    this.metadata = additionalData.metadata;
  } else if (object.metadata && typeof object.metadata === 'object') {
    this.metadata = object.metadata;
  }

  return object;
}

RequestObject.prototype.checkInformation = function () {
  // Test if the controller is well defined
  if (!this.controller) {
    return Promise.reject(new BadRequestError('No controller provided for object'));
  }

  // Test if the action is well defined
  if (!this.action) {
    return Promise.reject(new BadRequestError('No action provided for object'));
  }

  return Promise.resolve();
};

RequestObject.prototype.isValid = function () {
  return new Promise((resolve, reject) => {
    // TODO: implement validation
    if (this.data.body === undefined || _.isEmpty(this.data.body)) {
      return reject(new BadRequestError('The body can\'t be empty'));
    }

    resolve();
  });
};

module.exports = RequestObject;
