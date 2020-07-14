const { KuzzleError } = require('./kuzzleError');

class NotFoundError extends KuzzleError {
  constructor(message, id, code) {
    super(message, 404, id, code);
  }

  get name () {
    return 'NotFoundError';
  }
}

module.exports = NotFoundError;
