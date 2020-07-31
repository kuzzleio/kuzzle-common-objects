import { KuzzleError } from './kuzzleError';

export class PreconditionError extends KuzzleError {
  constructor(message, id?, code?) {
    super(message, 412, id, code);
  }
}
