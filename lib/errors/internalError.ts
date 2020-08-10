import { KuzzleError } from './kuzzleError';

export class InternalError extends KuzzleError {
  constructor(message, id?, code?) {
    super(message, 500, id, code);
  }
}
