import { KuzzleError } from './kuzzleError';

export class SizeLimitError extends KuzzleError {
  constructor(message, id?, code?) {
    super(message, 413, id, code);
  }
}
