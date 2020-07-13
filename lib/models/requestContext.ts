'use strict';

import * as assert from '../utils/assertType';
import { JSONObject } from '../utils/interfaces';

// private properties
const _token = 'token\u200b';
const _user = 'user\u200b';
const _connection = 'connection\u200b';
// Connection class properties
const _c_id = 'id\u200b';
const _c_protocol = 'protocol\u200b';
const _c_ips = 'ips\u200b';
const _c_misc = 'misc\u200b';

// Token model class from Kuzzle
interface IKuzzleToken {
  _id: string;
  expiresAt: number;
  ttl: number;
  userId: string;
  connectionId: string | null;
  jwt: string;
  refreshed: boolean;
}

// User model class from Kuzzle
interface IKuzzleUser extends JSONObject {
  _id: string;
  profileIds: string[];
}

// ClientConnection class from Kuzzle
interface IKuzzleConnection {
  id: string;
  protocol: string;
  headers: JSONObject;
  ips: string[];
}

/**
 * @class Connection information
 */
/**
 * @name id
 * @type {string}
 */
/**
 * @name protocol
 * @type {string}
 */
/**
 * @name ips
 * @type {Array}
 */
/**
 * @name misc
 * @type {object}
 */
class Connection {
  constructor(connection) {
    this[_c_id] = null;
    this[_c_protocol] = null;
    this[_c_ips] = [];
    this[_c_misc] = {};

    Object.seal(this);

    if (typeof connection !== 'object' || connection === null) {
      return;
    }

    for (const prop of Object.keys(connection)) {
      if (['id', 'protocol', 'ips'].includes(prop)) {
        this[prop] = connection[prop];
      }
      else {
        this.misc[prop] = connection[prop];
      }
    }
  }

  set id (str: string) {
    this[_c_id] = assert.assertString('connection.id', str);
  }

  get id (): string | null {
    return this[_c_id];
  }

  set protocol (str: string) {
    this[_c_protocol] = assert.assertString('connection.protocol', str);
  }

  get protocol (): string | null {
    return this[_c_protocol];
  }

  set ips (arr: string[]) {
    this[_c_ips] = assert.assertArray('connection.ips', arr, 'string');
  }

  get ips(): string[] {
    return this[_c_ips];
  }

  get misc (): JSONObject {
    return this[_c_misc];
  }

  toJSON (): JSONObject {
    return Object.assign({
      id: this[_c_id],
      protocol: this[_c_protocol],
      ips: this[_c_ips]
    }, this[_c_misc]);
  }
}

/**
 * @class
 * @param {object} [options]
 */
/**
 * @deprecated use connection.id instead
 * @name RequestContext#connectionId
 * @type {string}
 */
/**
 * @deprecated use connection.protocol instead
 * @name RequestContext#protocol
 * @type {string}
 */
/**
 * @name RequestContext#token
 * @type {object}
 */
/**
 * @name RequestContext#user
 * @type {object}
 */
/**
 * @name  RequestContext#connection
 * @type {Connection}
 */
export class RequestContext {
  constructor(options: any = {}) {

    this[_token] = null;
    this[_user] = null;
    this[_connection] = new Connection(options.connection);

    Object.seal(this);

    this.token = options.token;
    this.user = options.user;

    // @deprecated - backward compatibility only
    if (options.connectionId) {
      this.connectionId = options.connectionId;
    }

    if (options.protocol) {
      this.protocol = options.protocol;
    }
  }

  toJSON (): JSONObject {
    return {
      user: this[_user],
      token: this[_token],
      connection: this[_connection].toJSON()
    };
  }

  /**
   * @deprecated use connection.id instead
   * Context connectionId getter
   * @returns {null|string}
   */
  get connectionId (): string | null {
    return this[_connection].id;
  }

  /**
   * @deprecated use connection.id instead
   * Context connectionId setter
   * @param {null|string} str - new context connectionId
   */
  set connectionId (str: string) {
    this[_connection].id = assert.assertString('connectionId', str);
  }

  /**
   * @deprecated use connection.protocol instead
   * Context protocol getter
   * @returns {null|string}
   */
  get protocol (): string | null {
    return this[_connection].protocol;
  }

  /**
   * @deprecated use connection.protocol instead
   * Context protocol setter
   * @param {null|string} str - new context protocol
   */
  set protocol (str: string) {
    this[_connection].protocol = assert.assertString('protocol', str);
  }

  /**
   * Context connection informations getter
   * @returns {object}
   */
  get connection (): IKuzzleConnection {
    return this[_connection];
  }

  /**
   * Context token getter
   * @returns {null|object}
   */
  get token (): IKuzzleToken | null {
    return this[_token];
  }

  /**
   * Context token setter
   * @param {null|object} obj - new context token
   */
  set token (obj: IKuzzleToken | null) {
    this[_token] = assert.assertObject('token', obj);
  }

  /**
   * Context user getter
   * @returns {null|object}
   */
  get user (): IKuzzleUser | null {
    return this[_user];
  }

  /**
   * Context user setter
   * @param {null|object} obj - new context user
   */
  set user (obj: IKuzzleUser) {
    this[_user] = assert.assertObject('user', obj);
  }
}

module.exports = { RequestContext };
