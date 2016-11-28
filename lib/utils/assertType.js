'use strict';

const ParseError = require('../errors/parseError');

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
 * Throws if the provided data is not an integer
 * Returns the unmodified data if validated
 *
 * @throws
 * @param {string} attr - tested attribute name
 * @param {*} data
 * @return {number}
 */
function assertInteger(attr, data) {
  if (!Number.isInteger(data)) {
    throw new ParseError(`Attribute ${attr} must be an integer`);
  }

  return data;
}

module.exports.assertObject = assertObject;
module.exports.assertString = assertString;
module.exports.assertInteger = assertInteger;