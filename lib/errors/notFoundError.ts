import { KuzzleError } from './kuzzleError';

export class NotFoundError extends KuzzleError {
  constructor(message, id?, code?) {
    super(message, 404, id, code);
  }
}
