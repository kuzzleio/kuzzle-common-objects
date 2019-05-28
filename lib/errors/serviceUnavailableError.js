const KuzzleError = require('./kuzzleError');

class ServiceUnavailable extends KuzzleError {
  constructor(message, errorName, code) {
    super(message, 503, errorName, code);
  }

  get name () {
    return 'ServiceUnavailable';
  }
}

module.exports = ServiceUnavailable;
