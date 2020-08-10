import { KuzzleError } from './kuzzleError';

export class ForbiddenError extends KuzzleError {
  constructor(message, id?, code?) {
    super(message, 403, id, code);
  }
}
