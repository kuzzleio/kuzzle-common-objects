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
  /**
   * Unique ID
   */
  _id: string;
  /**
   * Expiration date in Epoch-micro
   */
  expiresAt: number;
  /**
   * Time-to-live
   */
  ttl: number;
  /**
   * Associated user ID
   */
  userId: string;
  /**
   * Associated connection ID
   */
  connectionId: string | null;
  /**
   * JWT token
   */
  jwt: string;
  /**
   * True if the token has been refreshed with the current request
   */
  refreshed: boolean;
}

// User model class from Kuzzle
interface IKuzzleUser extends JSONObject {
  /**
   * Unique ID
   */
  _id: string;
  /**
   * User profiles
   */
  profileIds: Array<string>;
}

// ClientConnection class from Kuzzle
interface IKuzzleConnection extends JSONObject {
  /**
   * Internal ID
   */
  id: string;
  /**
   * Protocol name
   */
  protocol: string;
  /**
   * Optional headers
   */
  headers: JSONObject;
  /**
   * Associated IP adresses
   */
  ips: Array<string>;
}

interface IRequestContextOptions {
  /**
   * Connection object
   */
  connection?: IKuzzleConnection;
  /**
   * Authenticated user object
   */
  user?: IKuzzleUser;
  /**
   * Kuzzle authentication token object
   */
  token?: IKuzzleToken;
  /**
   * Protocol at the origin of the connection
   */
  protocol?: string;
  /**
   * @deprecated
   */
  connectionId?: string;
}

/**
 * Information about the connection at the origin of the request.
 */
class Connection {
  constructor (connection: IKuzzleConnection) {
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

  /**
   * Internal connection ID
   */
  get id (): string | null {
    return this[_c_id];
  }

  set protocol (str: string) {
    this[_c_protocol] = assert.assertString('connection.protocol', str);
  }

  /**
   * Protocol name
   */
  get protocol (): string | null {
    return this[_c_protocol];
  }

  set ips (arr: Array<string>) {
    this[_c_ips] = assert.assertArray('connection.ips', arr, 'string');
  }

  /**
   * Array of IP addresses associated to the request
   */
  get ips(): Array<string> {
    return this[_c_ips];
  }

  /**
   * Other custom informations
   */
  get misc (): JSONObject {
    return this[_c_misc];
  }

  /**
   * Serializes the Connection object
   */
  toJSON (): JSONObject {
    return Object.assign({
      id: this[_c_id],
      protocol: this[_c_protocol],
      ips: this[_c_ips]
    }, this[_c_misc]);
  }
}

/**
 * Kuzzle execution context for the request.
 *
 * Contains informations about identity (token, user)
 * and origin (connection, protocol).
 */
export class RequestContext {
  constructor(options: IRequestContextOptions = {}) {

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

  /**
   * Serializes the RequestContext object
   */
  toJSON (): JSONObject {
    return {
      user: this[_user],
      token: this[_token],
      connection: this[_connection].toJSON()
    };
  }

  /**
   * @deprecated use connection.id instead
   * Internal connection ID
   */
  get connectionId (): string | null {
    return this[_connection].id;
  }

  set connectionId (str: string) {
    this[_connection].id = assert.assertString('connectionId', str);
  }

  /**
   * @deprecated use connection.protocol instead
   */
  get protocol (): string | null {
    return this[_connection].protocol;
  }

  set protocol (str: string) {
    this[_connection].protocol = assert.assertString('protocol', str);
  }

  /**
   * Connection that initiated the request
   */
  get connection (): IKuzzleConnection {
    return this[_connection];
  }

  /**
   * Authentication token
   */
  get token (): IKuzzleToken | null {
    return this[_token];
  }

  set token (obj: IKuzzleToken | null) {
    this[_token] = assert.assertObject('token', obj);
  }

  /**
   * Associated user
   */
  get user (): IKuzzleUser | null {
    return this[_user];
  }

  set user (obj: IKuzzleUser) {
    this[_user] = assert.assertObject('user', obj);
  }
}

module.exports = { RequestContext };
