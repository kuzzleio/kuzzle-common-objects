const KuzzleError = require('./kuzzleError');

class ParseError extends KuzzleError {
  constructor (message) {
    super(message, 400);
  }

  get name () {
    return 'ParseError';
  }
}

module.exports = ParseError;
