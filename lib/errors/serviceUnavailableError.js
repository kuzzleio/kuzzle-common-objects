const KuzzleError = require('./kuzzleError');

class ServiceUnavailable extends KuzzleError {
  constructor(message, id, code) {
    super(message, 503, id, code);
  }

  get name () {
    return 'ServiceUnavailable';
  }
}

module.exports = ServiceUnavailable;
