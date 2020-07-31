import { KuzzleError } from './kuzzleError';

export class UnauthorizedError extends KuzzleError {
  constructor(message, id?, code?) {
    super(message, 401, id, code);
  }
}
