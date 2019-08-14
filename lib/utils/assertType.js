'use strict';

const BadRequestError = require('../errors/badRequestError');

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
    throw new BadRequestError(`Attribute ${attr} must be of type "object"`);
  }

  return data;
}

/**
 * Throws if the provided data is not an array containing exclusively
 * values of the specified "type"
 * Returns a clone of the provided array if valid
 *
 * @throws
 * @param {string} attr - tested attribute name
 * @param {*} data
 * @return {array}
 */
function assertArray(attr, data, type) {
  if (data === null || data === undefined) {
    return [];
  }

  if (!Array.isArray(data)) {
    throw new BadRequestError(`Attribute ${attr} must be of type "array"`);
  }

  const clone = [];

  for (const d of data) {
    if (d !== undefined && d !== null) {
      if (typeof d !== type) {
        throw new BadRequestError(`Attribute ${attr} must contain only values of type "${type}"`);
      }

      clone.push(d);
    }
  }

  return clone;
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
    throw new BadRequestError(`Attribute ${attr} must be of type "string"`);
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
    throw new BadRequestError(`Attribute ${attr} must be an integer`);
  }

  return data;
}

module.exports = {
  assertObject,
  assertString,
  assertInteger,
  assertArray,
};
