import { KuzzleError } from './kuzzleError';

export class ExternalServiceError extends KuzzleError {
  constructor(message, id?, code?) {
    super(message, 500, id, code);
  }
}
