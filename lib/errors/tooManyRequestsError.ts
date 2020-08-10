import { KuzzleError } from './kuzzleError';

export class TooManyRequestsError extends KuzzleError {
  constructor(message, id?, code?) {
    super(message, 429, id, code);
  }
}
