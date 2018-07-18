const KuzzleError = require('./kuzzleError');
/**
 * @deprecated since Kuzzle 1.4.1, BadRequestError should be used instead
 */
class ParseError extends KuzzleError {
  constructor (message) {
    super(message, 400);
  }

  get name () {
    return 'ParseError';
  }
}

module.exports = ParseError;
