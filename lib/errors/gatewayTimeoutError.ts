import { KuzzleError } from './kuzzleError';

export class GatewayTimeoutError extends KuzzleError {
  constructor(message, id?, code?) {
    super(message, 504, id, code);
  }
}
