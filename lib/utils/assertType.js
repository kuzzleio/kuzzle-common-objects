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
 * Throws if the provided object is not an object or if it contains heterogeaous typed properties.
 * Returns the unmodified data if validated.
 *
 * @throws {ParseError}
 * @param {string} attr - tested attribute name
 * @param {*} data
 * @param {string} [type] - expected type for data properties
 * @returns {object|null}
 */
function assertUniTypeObject(attr, data, type) {
  data = assertObject(attr, data);

  if (data === null) {
    return null;
  }

  Object.keys(data).forEach(key => {
    if (type === undefined) {
      type = typeof data[key];
    }
    type = type.toLowerCase();

    let msg = `Attribute ${attr} must be of type "object" and have all its properties of type ${type}.`
      + `\nExpected "${attr}.${key}" to be of type "${type}", but go "${typeof data[key]}".`;

    switch(type) {
      case 'array':
        if (!Array.isArray(data[key])) {
          throw new ParseError(msg);
        }
        break;
      default:
        if (typeof data[key] !== type) {
          throw new ParseError(msg);
        }
        break;
    }

  });

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

exports.assertObject = assertObject;
exports.assertUniTypeObject = assertUniTypeObject;
exports.assertString = assertString;
exports.assertInteger = assertInteger;
