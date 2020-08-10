import { KuzzleError } from './kuzzleError';

export class ServiceUnavailableError extends KuzzleError {
  constructor(message, id?, code?) {
    super(message, 503, id, code);
  }
}
