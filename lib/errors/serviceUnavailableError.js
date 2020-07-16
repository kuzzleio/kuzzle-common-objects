const { KuzzleError } = require('./kuzzleError');

class ServiceUnavailable extends KuzzleError {
  constructor(message, id, code) {
    super(message, 503, id, code);
  }
}

module.exports = ServiceUnavailable;
