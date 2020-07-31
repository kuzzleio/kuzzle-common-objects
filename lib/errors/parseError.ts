import { KuzzleError } from './kuzzleError';
/**
 * @deprecated since Kuzzle 1.4.1, BadRequestError should be used instead
 */
export class ParseError extends KuzzleError {
  constructor(message, id?, code?) {
    super(message, 400, id, code);
  }
}
