import { KuzzleError } from './kuzzleError';

export class BadRequestError extends KuzzleError {
  constructor(message, id?, code?) {
    super(message, 400, id, code);
  }
}
