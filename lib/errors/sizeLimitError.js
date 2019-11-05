const KuzzleError = require('./kuzzleError');

class SizeLimitError extends KuzzleError {
  constructor(message, id, code) {
    super(message, 413, id, code);
  }

  get name () {
    return 'SizeLimitError';
  }
}

module.exports = SizeLimitError;
